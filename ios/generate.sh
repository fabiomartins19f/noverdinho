#!/bin/bash
# Gera o projeto Xcode a partir do project.yml.
#
# O xcodegen sempre força TARGETED_DEVICE_FAMILY "1,2" no target para
# plataforma iOS, ignorando o valor do project.yml. O app é iPhone-only,
# então aplicamos um patch determinístico: o padrão `"1,2"` só existe nas
# configs do target (as do projeto já são `= 1;`).
#
# O xcodegen também não gera o scheme compartilhado nesta versão; o script
# recria `NoVerdinho.xcscheme` apontando para o target (UUID extraído do
# pbxproj recém-gerado).
set -euo pipefail
cd "$(dirname "$0")"

xcodegen generate

sed -i '' 's/TARGETED_DEVICE_FAMILY = "1,2";/TARGETED_DEVICE_FAMILY = "1";/g' \
  NoVerdinho.xcodeproj/project.pbxproj

write_scheme() {
  # Com `schemes:` no project.yml o xcodegen já gera o scheme compartilhado
  # (incluindo os testes). Este fallback só atua se ele não existir.
  if [ -f NoVerdinho.xcodeproj/xcshareddata/xcschemes/NoVerdinho.xcscheme ]; then
    echo "Scheme compartilhado já gerado pelo xcodegen."
    return
  fi
  local uuid
  uuid=$(grep -B1 'isa = PBXNativeTarget;' NoVerdinho.xcodeproj/project.pbxproj \
    | grep 'NoVerdinho' | grep -oE '[0-9A-F]{24}' | head -1 || true)
  if [ -z "$uuid" ]; then
    echo "Aviso: não encontrou o target NoVerdinho no pbxproj; esquema não gerado." >&2
    return
  fi

  mkdir -p NoVerdinho.xcodeproj/xcshareddata/xcschemes
  cat > NoVerdinho.xcodeproj/xcshareddata/xcschemes/NoVerdinho.xcscheme <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<Scheme LastUpgradeVersion = "1600" version = "1.7">
   <BuildAction parallelizeBuildables = "YES" buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry buildForTesting = "YES" buildForRunning = "YES" buildForProfiling = "YES" buildForArchiving = "YES" buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "$uuid"
               BuildableName = "NoVerdinho.app"
               BlueprintName = "NoVerdinho"
               ReferencedContainer = "container:NoVerdinho.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction buildConfiguration = "Debug" selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB" selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB" shouldUseLaunchSchemeArgsEnv = "YES">
      <Testables>
      </Testables>
   </TestAction>
   <LaunchAction buildConfiguration = "Debug" selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB" selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB" launchStyle = "0" useCustomWorkingDirectory = "NO" ignoresPersistentStateOnLaunch = "NO" debugDocumentVersioning = "YES" debugServiceExtension = "internal" allowLocationSimulation = "YES">
      <BuildableProductRunnable runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "$uuid"
            BuildableName = "NoVerdinho.app"
            BlueprintName = "NoVerdinho"
            ReferencedContainer = "container:NoVerdinho.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </LaunchAction>
   <ProfileAction buildConfiguration = "Release" shouldUseLaunchSchemeArgsEnv = "YES" savedToolIdentifier = "" useCustomWorkingDirectory = "NO" debugDocumentVersioning = "YES">
      <BuildableProductRunnable runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "$uuid"
            BuildableName = "NoVerdinho.app"
            BlueprintName = "NoVerdinho"
            ReferencedContainer = "container:NoVerdinho.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction buildConfiguration = "Release" revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>
EOF
  echo "Esquema compartilhado NoVerdinho.xcscheme gerado."
}

write_scheme
echo "Projeto gerado com TARGETED_DEVICE_FAMILY = 1 (iPhone-only)."