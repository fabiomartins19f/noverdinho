import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type CreditCardInstallmentModel = runtime.Types.Result.DefaultSelection<Prisma.$CreditCardInstallmentPayload>;
export type AggregateCreditCardInstallment = {
    _count: CreditCardInstallmentCountAggregateOutputType | null;
    _avg: CreditCardInstallmentAvgAggregateOutputType | null;
    _sum: CreditCardInstallmentSumAggregateOutputType | null;
    _min: CreditCardInstallmentMinAggregateOutputType | null;
    _max: CreditCardInstallmentMaxAggregateOutputType | null;
};
export type CreditCardInstallmentAvgAggregateOutputType = {
    number: number | null;
    amount: runtime.Decimal | null;
};
export type CreditCardInstallmentSumAggregateOutputType = {
    number: number | null;
    amount: runtime.Decimal | null;
};
export type CreditCardInstallmentMinAggregateOutputType = {
    id: string | null;
    purchaseId: string | null;
    cardId: string | null;
    userId: string | null;
    invoiceId: string | null;
    number: number | null;
    amount: runtime.Decimal | null;
    dueDate: Date | null;
    status: $Enums.InstallmentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardInstallmentMaxAggregateOutputType = {
    id: string | null;
    purchaseId: string | null;
    cardId: string | null;
    userId: string | null;
    invoiceId: string | null;
    number: number | null;
    amount: runtime.Decimal | null;
    dueDate: Date | null;
    status: $Enums.InstallmentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardInstallmentCountAggregateOutputType = {
    id: number;
    purchaseId: number;
    cardId: number;
    userId: number;
    invoiceId: number;
    number: number;
    amount: number;
    dueDate: number;
    status: number;
    paidAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CreditCardInstallmentAvgAggregateInputType = {
    number?: true;
    amount?: true;
};
export type CreditCardInstallmentSumAggregateInputType = {
    number?: true;
    amount?: true;
};
export type CreditCardInstallmentMinAggregateInputType = {
    id?: true;
    purchaseId?: true;
    cardId?: true;
    userId?: true;
    invoiceId?: true;
    number?: true;
    amount?: true;
    dueDate?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardInstallmentMaxAggregateInputType = {
    id?: true;
    purchaseId?: true;
    cardId?: true;
    userId?: true;
    invoiceId?: true;
    number?: true;
    amount?: true;
    dueDate?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardInstallmentCountAggregateInputType = {
    id?: true;
    purchaseId?: true;
    cardId?: true;
    userId?: true;
    invoiceId?: true;
    number?: true;
    amount?: true;
    dueDate?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CreditCardInstallmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInstallmentWhereInput;
    orderBy?: Prisma.CreditCardInstallmentOrderByWithRelationInput | Prisma.CreditCardInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CreditCardInstallmentCountAggregateInputType;
    _avg?: CreditCardInstallmentAvgAggregateInputType;
    _sum?: CreditCardInstallmentSumAggregateInputType;
    _min?: CreditCardInstallmentMinAggregateInputType;
    _max?: CreditCardInstallmentMaxAggregateInputType;
};
export type GetCreditCardInstallmentAggregateType<T extends CreditCardInstallmentAggregateArgs> = {
    [P in keyof T & keyof AggregateCreditCardInstallment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCreditCardInstallment[P]> : Prisma.GetScalarType<T[P], AggregateCreditCardInstallment[P]>;
};
export type CreditCardInstallmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInstallmentWhereInput;
    orderBy?: Prisma.CreditCardInstallmentOrderByWithAggregationInput | Prisma.CreditCardInstallmentOrderByWithAggregationInput[];
    by: Prisma.CreditCardInstallmentScalarFieldEnum[] | Prisma.CreditCardInstallmentScalarFieldEnum;
    having?: Prisma.CreditCardInstallmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CreditCardInstallmentCountAggregateInputType | true;
    _avg?: CreditCardInstallmentAvgAggregateInputType;
    _sum?: CreditCardInstallmentSumAggregateInputType;
    _min?: CreditCardInstallmentMinAggregateInputType;
    _max?: CreditCardInstallmentMaxAggregateInputType;
};
export type CreditCardInstallmentGroupByOutputType = {
    id: string;
    purchaseId: string;
    cardId: string;
    userId: string;
    invoiceId: string | null;
    number: number;
    amount: runtime.Decimal;
    dueDate: Date;
    status: $Enums.InstallmentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CreditCardInstallmentCountAggregateOutputType | null;
    _avg: CreditCardInstallmentAvgAggregateOutputType | null;
    _sum: CreditCardInstallmentSumAggregateOutputType | null;
    _min: CreditCardInstallmentMinAggregateOutputType | null;
    _max: CreditCardInstallmentMaxAggregateOutputType | null;
};
export type GetCreditCardInstallmentGroupByPayload<T extends CreditCardInstallmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CreditCardInstallmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CreditCardInstallmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CreditCardInstallmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CreditCardInstallmentGroupByOutputType[P]>;
}>>;
export type CreditCardInstallmentWhereInput = {
    AND?: Prisma.CreditCardInstallmentWhereInput | Prisma.CreditCardInstallmentWhereInput[];
    OR?: Prisma.CreditCardInstallmentWhereInput[];
    NOT?: Prisma.CreditCardInstallmentWhereInput | Prisma.CreditCardInstallmentWhereInput[];
    id?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    purchaseId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    userId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    invoiceId?: Prisma.UuidNullableFilter<"CreditCardInstallment"> | string | null;
    number?: Prisma.IntFilter<"CreditCardInstallment"> | number;
    amount?: Prisma.DecimalFilter<"CreditCardInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    status?: Prisma.EnumInstallmentStatusFilter<"CreditCardInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"CreditCardInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    purchase?: Prisma.XOR<Prisma.CreditCardPurchaseScalarRelationFilter, Prisma.CreditCardPurchaseWhereInput>;
    card?: Prisma.XOR<Prisma.CreditCardScalarRelationFilter, Prisma.CreditCardWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    invoice?: Prisma.XOR<Prisma.CreditCardInvoiceNullableScalarRelationFilter, Prisma.CreditCardInvoiceWhereInput> | null;
};
export type CreditCardInstallmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    purchaseId?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    purchase?: Prisma.CreditCardPurchaseOrderByWithRelationInput;
    card?: Prisma.CreditCardOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    invoice?: Prisma.CreditCardInvoiceOrderByWithRelationInput;
};
export type CreditCardInstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CreditCardInstallmentWhereInput | Prisma.CreditCardInstallmentWhereInput[];
    OR?: Prisma.CreditCardInstallmentWhereInput[];
    NOT?: Prisma.CreditCardInstallmentWhereInput | Prisma.CreditCardInstallmentWhereInput[];
    purchaseId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    userId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    invoiceId?: Prisma.UuidNullableFilter<"CreditCardInstallment"> | string | null;
    number?: Prisma.IntFilter<"CreditCardInstallment"> | number;
    amount?: Prisma.DecimalFilter<"CreditCardInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    status?: Prisma.EnumInstallmentStatusFilter<"CreditCardInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"CreditCardInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    purchase?: Prisma.XOR<Prisma.CreditCardPurchaseScalarRelationFilter, Prisma.CreditCardPurchaseWhereInput>;
    card?: Prisma.XOR<Prisma.CreditCardScalarRelationFilter, Prisma.CreditCardWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    invoice?: Prisma.XOR<Prisma.CreditCardInvoiceNullableScalarRelationFilter, Prisma.CreditCardInvoiceWhereInput> | null;
}, "id">;
export type CreditCardInstallmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    purchaseId?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CreditCardInstallmentCountOrderByAggregateInput;
    _avg?: Prisma.CreditCardInstallmentAvgOrderByAggregateInput;
    _max?: Prisma.CreditCardInstallmentMaxOrderByAggregateInput;
    _min?: Prisma.CreditCardInstallmentMinOrderByAggregateInput;
    _sum?: Prisma.CreditCardInstallmentSumOrderByAggregateInput;
};
export type CreditCardInstallmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.CreditCardInstallmentScalarWhereWithAggregatesInput | Prisma.CreditCardInstallmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.CreditCardInstallmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CreditCardInstallmentScalarWhereWithAggregatesInput | Prisma.CreditCardInstallmentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CreditCardInstallment"> | string;
    purchaseId?: Prisma.UuidWithAggregatesFilter<"CreditCardInstallment"> | string;
    cardId?: Prisma.UuidWithAggregatesFilter<"CreditCardInstallment"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CreditCardInstallment"> | string;
    invoiceId?: Prisma.UuidNullableWithAggregatesFilter<"CreditCardInstallment"> | string | null;
    number?: Prisma.IntWithAggregatesFilter<"CreditCardInstallment"> | number;
    amount?: Prisma.DecimalWithAggregatesFilter<"CreditCardInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInstallment"> | Date | string;
    status?: Prisma.EnumInstallmentStatusWithAggregatesFilter<"CreditCardInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CreditCardInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInstallment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInstallment"> | Date | string;
};
export type CreditCardInstallmentCreateInput = {
    id?: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    purchase: Prisma.CreditCardPurchaseCreateNestedOneWithoutInstallmentsInput;
    card: Prisma.CreditCardCreateNestedOneWithoutInstallmentsInput;
    user: Prisma.UserCreateNestedOneWithoutInstallmentsInput;
    invoice?: Prisma.CreditCardInvoiceCreateNestedOneWithoutInstallmentsInput;
};
export type CreditCardInstallmentUncheckedCreateInput = {
    id?: string;
    purchaseId: string;
    cardId: string;
    userId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchase?: Prisma.CreditCardPurchaseUpdateOneRequiredWithoutInstallmentsNestedInput;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInstallmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutInstallmentsNestedInput;
    invoice?: Prisma.CreditCardInvoiceUpdateOneWithoutInstallmentsNestedInput;
};
export type CreditCardInstallmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentCreateManyInput = {
    id?: string;
    purchaseId: string;
    cardId: string;
    userId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentListRelationFilter = {
    every?: Prisma.CreditCardInstallmentWhereInput;
    some?: Prisma.CreditCardInstallmentWhereInput;
    none?: Prisma.CreditCardInstallmentWhereInput;
};
export type CreditCardInstallmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CreditCardInstallmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    purchaseId?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardInstallmentAvgOrderByAggregateInput = {
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CreditCardInstallmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    purchaseId?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardInstallmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    purchaseId?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardInstallmentSumOrderByAggregateInput = {
    number?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CreditCardInstallmentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput> | Prisma.CreditCardInstallmentCreateWithoutUserInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput> | Prisma.CreditCardInstallmentCreateWithoutUserInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput> | Prisma.CreditCardInstallmentCreateWithoutUserInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput> | Prisma.CreditCardInstallmentCreateWithoutUserInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput> | Prisma.CreditCardInstallmentCreateWithoutCardInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyCardInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUncheckedCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput> | Prisma.CreditCardInstallmentCreateWithoutCardInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyCardInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput> | Prisma.CreditCardInstallmentCreateWithoutCardInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutCardInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyCardInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutCardInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutCardInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput> | Prisma.CreditCardInstallmentCreateWithoutCardInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutCardInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyCardInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutCardInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutCardInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput> | Prisma.CreditCardInstallmentCreateWithoutInvoiceInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyInvoiceInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput> | Prisma.CreditCardInstallmentCreateWithoutInvoiceInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyInvoiceInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput> | Prisma.CreditCardInstallmentCreateWithoutInvoiceInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyInvoiceInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutInvoiceInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput> | Prisma.CreditCardInstallmentCreateWithoutInvoiceInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyInvoiceInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutInvoiceInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentCreateNestedManyWithoutPurchaseInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput> | Prisma.CreditCardInstallmentCreateWithoutPurchaseInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyPurchaseInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUncheckedCreateNestedManyWithoutPurchaseInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput> | Prisma.CreditCardInstallmentCreateWithoutPurchaseInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyPurchaseInputEnvelope;
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
};
export type CreditCardInstallmentUpdateManyWithoutPurchaseNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput> | Prisma.CreditCardInstallmentCreateWithoutPurchaseInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutPurchaseInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutPurchaseInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyPurchaseInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutPurchaseInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutPurchaseInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutPurchaseInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutPurchaseInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput> | Prisma.CreditCardInstallmentCreateWithoutPurchaseInput[] | Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput[];
    connectOrCreate?: Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput | Prisma.CreditCardInstallmentCreateOrConnectWithoutPurchaseInput[];
    upsert?: Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutPurchaseInput | Prisma.CreditCardInstallmentUpsertWithWhereUniqueWithoutPurchaseInput[];
    createMany?: Prisma.CreditCardInstallmentCreateManyPurchaseInputEnvelope;
    set?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    delete?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    connect?: Prisma.CreditCardInstallmentWhereUniqueInput | Prisma.CreditCardInstallmentWhereUniqueInput[];
    update?: Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutPurchaseInput | Prisma.CreditCardInstallmentUpdateWithWhereUniqueWithoutPurchaseInput[];
    updateMany?: Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutPurchaseInput | Prisma.CreditCardInstallmentUpdateManyWithWhereWithoutPurchaseInput[];
    deleteMany?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
};
export type EnumInstallmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.InstallmentStatus;
};
export type CreditCardInstallmentCreateWithoutUserInput = {
    id?: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    purchase: Prisma.CreditCardPurchaseCreateNestedOneWithoutInstallmentsInput;
    card: Prisma.CreditCardCreateNestedOneWithoutInstallmentsInput;
    invoice?: Prisma.CreditCardInvoiceCreateNestedOneWithoutInstallmentsInput;
};
export type CreditCardInstallmentUncheckedCreateWithoutUserInput = {
    id?: string;
    purchaseId: string;
    cardId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentCreateOrConnectWithoutUserInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput>;
};
export type CreditCardInstallmentCreateManyUserInputEnvelope = {
    data: Prisma.CreditCardInstallmentCreateManyUserInput | Prisma.CreditCardInstallmentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInstallmentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutUserInput>;
};
export type CreditCardInstallmentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutUserInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutUserInput>;
};
export type CreditCardInstallmentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CreditCardInstallmentScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateManyMutationInput, Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutUserInput>;
};
export type CreditCardInstallmentScalarWhereInput = {
    AND?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
    OR?: Prisma.CreditCardInstallmentScalarWhereInput[];
    NOT?: Prisma.CreditCardInstallmentScalarWhereInput | Prisma.CreditCardInstallmentScalarWhereInput[];
    id?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    purchaseId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    userId?: Prisma.UuidFilter<"CreditCardInstallment"> | string;
    invoiceId?: Prisma.UuidNullableFilter<"CreditCardInstallment"> | string | null;
    number?: Prisma.IntFilter<"CreditCardInstallment"> | number;
    amount?: Prisma.DecimalFilter<"CreditCardInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    status?: Prisma.EnumInstallmentStatusFilter<"CreditCardInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"CreditCardInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardInstallment"> | Date | string;
};
export type CreditCardInstallmentCreateWithoutCardInput = {
    id?: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    purchase: Prisma.CreditCardPurchaseCreateNestedOneWithoutInstallmentsInput;
    user: Prisma.UserCreateNestedOneWithoutInstallmentsInput;
    invoice?: Prisma.CreditCardInvoiceCreateNestedOneWithoutInstallmentsInput;
};
export type CreditCardInstallmentUncheckedCreateWithoutCardInput = {
    id?: string;
    purchaseId: string;
    userId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentCreateOrConnectWithoutCardInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput>;
};
export type CreditCardInstallmentCreateManyCardInputEnvelope = {
    data: Prisma.CreditCardInstallmentCreateManyCardInput | Prisma.CreditCardInstallmentCreateManyCardInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInstallmentUpsertWithWhereUniqueWithoutCardInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutCardInput>;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutCardInput>;
};
export type CreditCardInstallmentUpdateWithWhereUniqueWithoutCardInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutCardInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutCardInput>;
};
export type CreditCardInstallmentUpdateManyWithWhereWithoutCardInput = {
    where: Prisma.CreditCardInstallmentScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateManyMutationInput, Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutCardInput>;
};
export type CreditCardInstallmentCreateWithoutInvoiceInput = {
    id?: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    purchase: Prisma.CreditCardPurchaseCreateNestedOneWithoutInstallmentsInput;
    card: Prisma.CreditCardCreateNestedOneWithoutInstallmentsInput;
    user: Prisma.UserCreateNestedOneWithoutInstallmentsInput;
};
export type CreditCardInstallmentUncheckedCreateWithoutInvoiceInput = {
    id?: string;
    purchaseId: string;
    cardId: string;
    userId: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentCreateOrConnectWithoutInvoiceInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput>;
};
export type CreditCardInstallmentCreateManyInvoiceInputEnvelope = {
    data: Prisma.CreditCardInstallmentCreateManyInvoiceInput | Prisma.CreditCardInstallmentCreateManyInvoiceInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInstallmentUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutInvoiceInput>;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutInvoiceInput>;
};
export type CreditCardInstallmentUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutInvoiceInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutInvoiceInput>;
};
export type CreditCardInstallmentUpdateManyWithWhereWithoutInvoiceInput = {
    where: Prisma.CreditCardInstallmentScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateManyMutationInput, Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutInvoiceInput>;
};
export type CreditCardInstallmentCreateWithoutPurchaseInput = {
    id?: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutInstallmentsInput;
    user: Prisma.UserCreateNestedOneWithoutInstallmentsInput;
    invoice?: Prisma.CreditCardInvoiceCreateNestedOneWithoutInstallmentsInput;
};
export type CreditCardInstallmentUncheckedCreateWithoutPurchaseInput = {
    id?: string;
    cardId: string;
    userId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentCreateOrConnectWithoutPurchaseInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput>;
};
export type CreditCardInstallmentCreateManyPurchaseInputEnvelope = {
    data: Prisma.CreditCardInstallmentCreateManyPurchaseInput | Prisma.CreditCardInstallmentCreateManyPurchaseInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInstallmentUpsertWithWhereUniqueWithoutPurchaseInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutPurchaseInput>;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedCreateWithoutPurchaseInput>;
};
export type CreditCardInstallmentUpdateWithWhereUniqueWithoutPurchaseInput = {
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateWithoutPurchaseInput, Prisma.CreditCardInstallmentUncheckedUpdateWithoutPurchaseInput>;
};
export type CreditCardInstallmentUpdateManyWithWhereWithoutPurchaseInput = {
    where: Prisma.CreditCardInstallmentScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateManyMutationInput, Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseInput>;
};
export type CreditCardInstallmentCreateManyUserInput = {
    id?: string;
    purchaseId: string;
    cardId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchase?: Prisma.CreditCardPurchaseUpdateOneRequiredWithoutInstallmentsNestedInput;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInstallmentsNestedInput;
    invoice?: Prisma.CreditCardInvoiceUpdateOneWithoutInstallmentsNestedInput;
};
export type CreditCardInstallmentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentCreateManyCardInput = {
    id?: string;
    purchaseId: string;
    userId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchase?: Prisma.CreditCardPurchaseUpdateOneRequiredWithoutInstallmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutInstallmentsNestedInput;
    invoice?: Prisma.CreditCardInvoiceUpdateOneWithoutInstallmentsNestedInput;
};
export type CreditCardInstallmentUncheckedUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentCreateManyInvoiceInput = {
    id?: string;
    purchaseId: string;
    cardId: string;
    userId: string;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchase?: Prisma.CreditCardPurchaseUpdateOneRequiredWithoutInstallmentsNestedInput;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInstallmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutInstallmentsNestedInput;
};
export type CreditCardInstallmentUncheckedUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    purchaseId?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentCreateManyPurchaseInput = {
    id?: string;
    cardId: string;
    userId: string;
    invoiceId?: string | null;
    number: number;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate: Date | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInstallmentUpdateWithoutPurchaseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInstallmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutInstallmentsNestedInput;
    invoice?: Prisma.CreditCardInvoiceUpdateOneWithoutInstallmentsNestedInput;
};
export type CreditCardInstallmentUncheckedUpdateWithoutPurchaseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    number?: Prisma.IntFieldUpdateOperationsInput | number;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInstallmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    purchaseId?: boolean;
    cardId?: boolean;
    userId?: boolean;
    invoiceId?: boolean;
    number?: boolean;
    amount?: boolean;
    dueDate?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    purchase?: boolean | Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardInstallment"]>;
export type CreditCardInstallmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    purchaseId?: boolean;
    cardId?: boolean;
    userId?: boolean;
    invoiceId?: boolean;
    number?: boolean;
    amount?: boolean;
    dueDate?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    purchase?: boolean | Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardInstallment"]>;
export type CreditCardInstallmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    purchaseId?: boolean;
    cardId?: boolean;
    userId?: boolean;
    invoiceId?: boolean;
    number?: boolean;
    amount?: boolean;
    dueDate?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    purchase?: boolean | Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardInstallment"]>;
export type CreditCardInstallmentSelectScalar = {
    id?: boolean;
    purchaseId?: boolean;
    cardId?: boolean;
    userId?: boolean;
    invoiceId?: boolean;
    number?: boolean;
    amount?: boolean;
    dueDate?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CreditCardInstallmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "purchaseId" | "cardId" | "userId" | "invoiceId" | "number" | "amount" | "dueDate" | "status" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["creditCardInstallment"]>;
export type CreditCardInstallmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    purchase?: boolean | Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>;
};
export type CreditCardInstallmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    purchase?: boolean | Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>;
};
export type CreditCardInstallmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    purchase?: boolean | Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoice?: boolean | Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>;
};
export type $CreditCardInstallmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CreditCardInstallment";
    objects: {
        purchase: Prisma.$CreditCardPurchasePayload<ExtArgs>;
        card: Prisma.$CreditCardPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        invoice: Prisma.$CreditCardInvoicePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        purchaseId: string;
        cardId: string;
        userId: string;
        invoiceId: string | null;
        number: number;
        amount: runtime.Decimal;
        dueDate: Date;
        status: $Enums.InstallmentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["creditCardInstallment"]>;
    composites: {};
};
export type CreditCardInstallmentGetPayload<S extends boolean | null | undefined | CreditCardInstallmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload, S>;
export type CreditCardInstallmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CreditCardInstallmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CreditCardInstallmentCountAggregateInputType | true;
};
export interface CreditCardInstallmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CreditCardInstallment'];
        meta: {
            name: 'CreditCardInstallment';
        };
    };
    findUnique<T extends CreditCardInstallmentFindUniqueArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CreditCardInstallmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CreditCardInstallmentFindFirstArgs>(args?: Prisma.SelectSubset<T, CreditCardInstallmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CreditCardInstallmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CreditCardInstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CreditCardInstallmentFindManyArgs>(args?: Prisma.SelectSubset<T, CreditCardInstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CreditCardInstallmentCreateArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentCreateArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CreditCardInstallmentCreateManyArgs>(args?: Prisma.SelectSubset<T, CreditCardInstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CreditCardInstallmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CreditCardInstallmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CreditCardInstallmentDeleteArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentDeleteArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CreditCardInstallmentUpdateArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentUpdateArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CreditCardInstallmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, CreditCardInstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CreditCardInstallmentUpdateManyArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CreditCardInstallmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CreditCardInstallmentUpsertArgs>(args: Prisma.SelectSubset<T, CreditCardInstallmentUpsertArgs<ExtArgs>>): Prisma.Prisma__CreditCardInstallmentClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CreditCardInstallmentCountArgs>(args?: Prisma.Subset<T, CreditCardInstallmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CreditCardInstallmentCountAggregateOutputType> : number>;
    aggregate<T extends CreditCardInstallmentAggregateArgs>(args: Prisma.Subset<T, CreditCardInstallmentAggregateArgs>): Prisma.PrismaPromise<GetCreditCardInstallmentAggregateType<T>>;
    groupBy<T extends CreditCardInstallmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CreditCardInstallmentGroupByArgs['orderBy'];
    } : {
        orderBy?: CreditCardInstallmentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CreditCardInstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditCardInstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CreditCardInstallmentFieldRefs;
}
export interface Prisma__CreditCardInstallmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    purchase<T extends Prisma.CreditCardPurchaseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardPurchaseDefaultArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    card<T extends Prisma.CreditCardDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardDefaultArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    invoice<T extends Prisma.CreditCardInstallment$invoiceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardInstallment$invoiceArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CreditCardInstallmentFieldRefs {
    readonly id: Prisma.FieldRef<"CreditCardInstallment", 'String'>;
    readonly purchaseId: Prisma.FieldRef<"CreditCardInstallment", 'String'>;
    readonly cardId: Prisma.FieldRef<"CreditCardInstallment", 'String'>;
    readonly userId: Prisma.FieldRef<"CreditCardInstallment", 'String'>;
    readonly invoiceId: Prisma.FieldRef<"CreditCardInstallment", 'String'>;
    readonly number: Prisma.FieldRef<"CreditCardInstallment", 'Int'>;
    readonly amount: Prisma.FieldRef<"CreditCardInstallment", 'Decimal'>;
    readonly dueDate: Prisma.FieldRef<"CreditCardInstallment", 'DateTime'>;
    readonly status: Prisma.FieldRef<"CreditCardInstallment", 'InstallmentStatus'>;
    readonly paidAt: Prisma.FieldRef<"CreditCardInstallment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CreditCardInstallment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CreditCardInstallment", 'DateTime'>;
}
export type CreditCardInstallmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
};
export type CreditCardInstallmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
};
export type CreditCardInstallmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where?: Prisma.CreditCardInstallmentWhereInput;
    orderBy?: Prisma.CreditCardInstallmentOrderByWithRelationInput | Prisma.CreditCardInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardInstallmentScalarFieldEnum | Prisma.CreditCardInstallmentScalarFieldEnum[];
};
export type CreditCardInstallmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where?: Prisma.CreditCardInstallmentWhereInput;
    orderBy?: Prisma.CreditCardInstallmentOrderByWithRelationInput | Prisma.CreditCardInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardInstallmentScalarFieldEnum | Prisma.CreditCardInstallmentScalarFieldEnum[];
};
export type CreditCardInstallmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where?: Prisma.CreditCardInstallmentWhereInput;
    orderBy?: Prisma.CreditCardInstallmentOrderByWithRelationInput | Prisma.CreditCardInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardInstallmentScalarFieldEnum | Prisma.CreditCardInstallmentScalarFieldEnum[];
};
export type CreditCardInstallmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardInstallmentCreateInput, Prisma.CreditCardInstallmentUncheckedCreateInput>;
};
export type CreditCardInstallmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CreditCardInstallmentCreateManyInput | Prisma.CreditCardInstallmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInstallmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    data: Prisma.CreditCardInstallmentCreateManyInput | Prisma.CreditCardInstallmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CreditCardInstallmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CreditCardInstallmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateInput, Prisma.CreditCardInstallmentUncheckedUpdateInput>;
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
};
export type CreditCardInstallmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateManyMutationInput, Prisma.CreditCardInstallmentUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardInstallmentWhereInput;
    limit?: number;
};
export type CreditCardInstallmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardInstallmentUpdateManyMutationInput, Prisma.CreditCardInstallmentUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardInstallmentWhereInput;
    limit?: number;
    include?: Prisma.CreditCardInstallmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CreditCardInstallmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInstallmentCreateInput, Prisma.CreditCardInstallmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CreditCardInstallmentUpdateInput, Prisma.CreditCardInstallmentUncheckedUpdateInput>;
};
export type CreditCardInstallmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
    where: Prisma.CreditCardInstallmentWhereUniqueInput;
};
export type CreditCardInstallmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInstallmentWhereInput;
    limit?: number;
};
export type CreditCardInstallment$invoiceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    where?: Prisma.CreditCardInvoiceWhereInput;
};
export type CreditCardInstallmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInstallmentOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInstallmentInclude<ExtArgs> | null;
};
