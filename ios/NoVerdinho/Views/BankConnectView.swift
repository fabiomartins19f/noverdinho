import SwiftUI
import WebKit

// MARK: - Conecta bancos via Open Finance (widget Pluggy no app)

struct BankConnectView: View {
    let serverURL: String
    let phone: String
    var onConnected: () -> Void = {}

    @Environment(\.dismiss) private var dismiss
    @State private var connectToken: String?
    @State private var error: String?

    var body: some View {
        NavigationStack {
            Group {
                if let connectToken {
                    PluggyConnectWebView(connectToken: connectToken, onDone: onConnected)
                } else if let error {
                    ContentUnavailableView {
                        Label("Não deu para conectar", systemImage: "wifi.exclamationmark")
                    } description: {
                        Text(error)
                    } actions: {
                        Button("Fechar") { dismiss() }
                    }
                } else {
                    ProgressView("Abrindo conexão segura…")
                        .tint(Theme.green)
                }
            }
            .navigationTitle("Conectar banco")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Fechar") { dismiss() }
                }
            }
        }
        .task {
            do {
                connectToken = try await CloudSyncService.getConnectToken(serverURL: serverURL, phone: phone)
            } catch {
                self.error = error.localizedDescription
            }
        }
        .presentationDetents([.large])
    }
}

struct PluggyConnectWebView: UIViewRepresentable {
    let connectToken: String
    let onDone: () -> Void

    func makeCoordinator() -> Coordinator { Coordinator(onDone: onDone) }

    func makeUIView(context: Context) -> WKWebView {
        let configuration = WKWebViewConfiguration()
        configuration.websiteDataStore = .default()
        configuration.userContentController.add(context.coordinator, name: "noverdinho")

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.navigationDelegate = context.coordinator

        let html = """
        <!DOCTYPE html>
        <html><head><meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.pluggy.ai/pluggy-connect/latest/pluggy-connect.js"></script>
        <style>body{margin:0;background:#0A0E0C}</style></head>
        <body><div id="pluggy-connect"></div>
        <script>
        const connect = new PluggyConnect({
          connectToken: '\(connectToken)',
          container: '#pluggy-connect',
          onSuccess: function(result) {
            window.webkit.messageHandlers.noverdinho.postMessage('connected:' + (result.itemId || ''));
          },
          onClose: function() {
            window.webkit.messageHandlers.noverdinho.postMessage('closed');
          },
          onError: function(err) {
            window.webkit.messageHandlers.noverdinho.postMessage('error:' + (err && err.message ? err.message : 'desconhecido'));
          }
        });
        connect.init();
        </script></body></html>
        """
        webView.loadHTMLString(html, baseURL: URL(string: "https://app.pluggy.ai"))
        return webView
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        let onDone: () -> Void
        init(onDone: @escaping () -> Void) { self.onDone = onDone }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? String else { return }
            if body.hasPrefix("connected:") {
                Haptics.success()
                onDone()
            }
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            // Mantém a tela; o widget reporta erros próprios via onError.
        }
    }
}