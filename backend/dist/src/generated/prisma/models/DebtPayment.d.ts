import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type DebtPaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$DebtPaymentPayload>;
export type AggregateDebtPayment = {
    _count: DebtPaymentCountAggregateOutputType | null;
    _avg: DebtPaymentAvgAggregateOutputType | null;
    _sum: DebtPaymentSumAggregateOutputType | null;
    _min: DebtPaymentMinAggregateOutputType | null;
    _max: DebtPaymentMaxAggregateOutputType | null;
};
export type DebtPaymentAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type DebtPaymentSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type DebtPaymentMinAggregateOutputType = {
    id: string | null;
    debtId: string | null;
    installmentId: string | null;
    userId: string | null;
    amount: runtime.Decimal | null;
    paymentDate: Date | null;
    note: string | null;
    createdAt: Date | null;
};
export type DebtPaymentMaxAggregateOutputType = {
    id: string | null;
    debtId: string | null;
    installmentId: string | null;
    userId: string | null;
    amount: runtime.Decimal | null;
    paymentDate: Date | null;
    note: string | null;
    createdAt: Date | null;
};
export type DebtPaymentCountAggregateOutputType = {
    id: number;
    debtId: number;
    installmentId: number;
    userId: number;
    amount: number;
    paymentDate: number;
    note: number;
    createdAt: number;
    _all: number;
};
export type DebtPaymentAvgAggregateInputType = {
    amount?: true;
};
export type DebtPaymentSumAggregateInputType = {
    amount?: true;
};
export type DebtPaymentMinAggregateInputType = {
    id?: true;
    debtId?: true;
    installmentId?: true;
    userId?: true;
    amount?: true;
    paymentDate?: true;
    note?: true;
    createdAt?: true;
};
export type DebtPaymentMaxAggregateInputType = {
    id?: true;
    debtId?: true;
    installmentId?: true;
    userId?: true;
    amount?: true;
    paymentDate?: true;
    note?: true;
    createdAt?: true;
};
export type DebtPaymentCountAggregateInputType = {
    id?: true;
    debtId?: true;
    installmentId?: true;
    userId?: true;
    amount?: true;
    paymentDate?: true;
    note?: true;
    createdAt?: true;
    _all?: true;
};
export type DebtPaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPaymentWhereInput;
    orderBy?: Prisma.DebtPaymentOrderByWithRelationInput | Prisma.DebtPaymentOrderByWithRelationInput[];
    cursor?: Prisma.DebtPaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DebtPaymentCountAggregateInputType;
    _avg?: DebtPaymentAvgAggregateInputType;
    _sum?: DebtPaymentSumAggregateInputType;
    _min?: DebtPaymentMinAggregateInputType;
    _max?: DebtPaymentMaxAggregateInputType;
};
export type GetDebtPaymentAggregateType<T extends DebtPaymentAggregateArgs> = {
    [P in keyof T & keyof AggregateDebtPayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDebtPayment[P]> : Prisma.GetScalarType<T[P], AggregateDebtPayment[P]>;
};
export type DebtPaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPaymentWhereInput;
    orderBy?: Prisma.DebtPaymentOrderByWithAggregationInput | Prisma.DebtPaymentOrderByWithAggregationInput[];
    by: Prisma.DebtPaymentScalarFieldEnum[] | Prisma.DebtPaymentScalarFieldEnum;
    having?: Prisma.DebtPaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DebtPaymentCountAggregateInputType | true;
    _avg?: DebtPaymentAvgAggregateInputType;
    _sum?: DebtPaymentSumAggregateInputType;
    _min?: DebtPaymentMinAggregateInputType;
    _max?: DebtPaymentMaxAggregateInputType;
};
export type DebtPaymentGroupByOutputType = {
    id: string;
    debtId: string;
    installmentId: string | null;
    userId: string;
    amount: runtime.Decimal;
    paymentDate: Date;
    note: string | null;
    createdAt: Date;
    _count: DebtPaymentCountAggregateOutputType | null;
    _avg: DebtPaymentAvgAggregateOutputType | null;
    _sum: DebtPaymentSumAggregateOutputType | null;
    _min: DebtPaymentMinAggregateOutputType | null;
    _max: DebtPaymentMaxAggregateOutputType | null;
};
export type GetDebtPaymentGroupByPayload<T extends DebtPaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DebtPaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DebtPaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DebtPaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DebtPaymentGroupByOutputType[P]>;
}>>;
export type DebtPaymentWhereInput = {
    AND?: Prisma.DebtPaymentWhereInput | Prisma.DebtPaymentWhereInput[];
    OR?: Prisma.DebtPaymentWhereInput[];
    NOT?: Prisma.DebtPaymentWhereInput | Prisma.DebtPaymentWhereInput[];
    id?: Prisma.UuidFilter<"DebtPayment"> | string;
    debtId?: Prisma.UuidFilter<"DebtPayment"> | string;
    installmentId?: Prisma.UuidNullableFilter<"DebtPayment"> | string | null;
    userId?: Prisma.UuidFilter<"DebtPayment"> | string;
    amount?: Prisma.DecimalFilter<"DebtPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFilter<"DebtPayment"> | Date | string;
    note?: Prisma.StringNullableFilter<"DebtPayment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtPayment"> | Date | string;
    debt?: Prisma.XOR<Prisma.DebtScalarRelationFilter, Prisma.DebtWhereInput>;
    installment?: Prisma.XOR<Prisma.DebtInstallmentNullableScalarRelationFilter, Prisma.DebtInstallmentWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type DebtPaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    installmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentDate?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    debt?: Prisma.DebtOrderByWithRelationInput;
    installment?: Prisma.DebtInstallmentOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type DebtPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DebtPaymentWhereInput | Prisma.DebtPaymentWhereInput[];
    OR?: Prisma.DebtPaymentWhereInput[];
    NOT?: Prisma.DebtPaymentWhereInput | Prisma.DebtPaymentWhereInput[];
    debtId?: Prisma.UuidFilter<"DebtPayment"> | string;
    installmentId?: Prisma.UuidNullableFilter<"DebtPayment"> | string | null;
    userId?: Prisma.UuidFilter<"DebtPayment"> | string;
    amount?: Prisma.DecimalFilter<"DebtPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFilter<"DebtPayment"> | Date | string;
    note?: Prisma.StringNullableFilter<"DebtPayment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtPayment"> | Date | string;
    debt?: Prisma.XOR<Prisma.DebtScalarRelationFilter, Prisma.DebtWhereInput>;
    installment?: Prisma.XOR<Prisma.DebtInstallmentNullableScalarRelationFilter, Prisma.DebtInstallmentWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type DebtPaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    installmentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentDate?: Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DebtPaymentCountOrderByAggregateInput;
    _avg?: Prisma.DebtPaymentAvgOrderByAggregateInput;
    _max?: Prisma.DebtPaymentMaxOrderByAggregateInput;
    _min?: Prisma.DebtPaymentMinOrderByAggregateInput;
    _sum?: Prisma.DebtPaymentSumOrderByAggregateInput;
};
export type DebtPaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.DebtPaymentScalarWhereWithAggregatesInput | Prisma.DebtPaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.DebtPaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DebtPaymentScalarWhereWithAggregatesInput | Prisma.DebtPaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DebtPayment"> | string;
    debtId?: Prisma.UuidWithAggregatesFilter<"DebtPayment"> | string;
    installmentId?: Prisma.UuidNullableWithAggregatesFilter<"DebtPayment"> | string | null;
    userId?: Prisma.UuidWithAggregatesFilter<"DebtPayment"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"DebtPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeWithAggregatesFilter<"DebtPayment"> | Date | string;
    note?: Prisma.StringNullableWithAggregatesFilter<"DebtPayment"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DebtPayment"> | Date | string;
};
export type DebtPaymentCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    debt: Prisma.DebtCreateNestedOneWithoutPaymentsInput;
    installment?: Prisma.DebtInstallmentCreateNestedOneWithoutPaymentsInput;
    user: Prisma.UserCreateNestedOneWithoutDebtPaymentsInput;
};
export type DebtPaymentUncheckedCreateInput = {
    id?: string;
    debtId: string;
    installmentId?: string | null;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutPaymentsNestedInput;
    installment?: Prisma.DebtInstallmentUpdateOneWithoutPaymentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutDebtPaymentsNestedInput;
};
export type DebtPaymentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentCreateManyInput = {
    id?: string;
    debtId: string;
    installmentId?: string | null;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentListRelationFilter = {
    every?: Prisma.DebtPaymentWhereInput;
    some?: Prisma.DebtPaymentWhereInput;
    none?: Prisma.DebtPaymentWhereInput;
};
export type DebtPaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DebtPaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    installmentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentDate?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DebtPaymentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type DebtPaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    installmentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentDate?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DebtPaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    installmentId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentDate?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DebtPaymentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type DebtPaymentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutUserInput, Prisma.DebtPaymentUncheckedCreateWithoutUserInput> | Prisma.DebtPaymentCreateWithoutUserInput[] | Prisma.DebtPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutUserInput | Prisma.DebtPaymentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DebtPaymentCreateManyUserInputEnvelope;
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
};
export type DebtPaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutUserInput, Prisma.DebtPaymentUncheckedCreateWithoutUserInput> | Prisma.DebtPaymentCreateWithoutUserInput[] | Prisma.DebtPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutUserInput | Prisma.DebtPaymentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DebtPaymentCreateManyUserInputEnvelope;
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
};
export type DebtPaymentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutUserInput, Prisma.DebtPaymentUncheckedCreateWithoutUserInput> | Prisma.DebtPaymentCreateWithoutUserInput[] | Prisma.DebtPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutUserInput | Prisma.DebtPaymentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DebtPaymentUpsertWithWhereUniqueWithoutUserInput | Prisma.DebtPaymentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DebtPaymentCreateManyUserInputEnvelope;
    set?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    disconnect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    delete?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    update?: Prisma.DebtPaymentUpdateWithWhereUniqueWithoutUserInput | Prisma.DebtPaymentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DebtPaymentUpdateManyWithWhereWithoutUserInput | Prisma.DebtPaymentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
};
export type DebtPaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutUserInput, Prisma.DebtPaymentUncheckedCreateWithoutUserInput> | Prisma.DebtPaymentCreateWithoutUserInput[] | Prisma.DebtPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutUserInput | Prisma.DebtPaymentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DebtPaymentUpsertWithWhereUniqueWithoutUserInput | Prisma.DebtPaymentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DebtPaymentCreateManyUserInputEnvelope;
    set?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    disconnect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    delete?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    update?: Prisma.DebtPaymentUpdateWithWhereUniqueWithoutUserInput | Prisma.DebtPaymentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DebtPaymentUpdateManyWithWhereWithoutUserInput | Prisma.DebtPaymentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
};
export type DebtPaymentCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutDebtInput, Prisma.DebtPaymentUncheckedCreateWithoutDebtInput> | Prisma.DebtPaymentCreateWithoutDebtInput[] | Prisma.DebtPaymentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutDebtInput | Prisma.DebtPaymentCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.DebtPaymentCreateManyDebtInputEnvelope;
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
};
export type DebtPaymentUncheckedCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutDebtInput, Prisma.DebtPaymentUncheckedCreateWithoutDebtInput> | Prisma.DebtPaymentCreateWithoutDebtInput[] | Prisma.DebtPaymentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutDebtInput | Prisma.DebtPaymentCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.DebtPaymentCreateManyDebtInputEnvelope;
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
};
export type DebtPaymentUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutDebtInput, Prisma.DebtPaymentUncheckedCreateWithoutDebtInput> | Prisma.DebtPaymentCreateWithoutDebtInput[] | Prisma.DebtPaymentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutDebtInput | Prisma.DebtPaymentCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.DebtPaymentUpsertWithWhereUniqueWithoutDebtInput | Prisma.DebtPaymentUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.DebtPaymentCreateManyDebtInputEnvelope;
    set?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    disconnect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    delete?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    update?: Prisma.DebtPaymentUpdateWithWhereUniqueWithoutDebtInput | Prisma.DebtPaymentUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.DebtPaymentUpdateManyWithWhereWithoutDebtInput | Prisma.DebtPaymentUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
};
export type DebtPaymentUncheckedUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutDebtInput, Prisma.DebtPaymentUncheckedCreateWithoutDebtInput> | Prisma.DebtPaymentCreateWithoutDebtInput[] | Prisma.DebtPaymentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutDebtInput | Prisma.DebtPaymentCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.DebtPaymentUpsertWithWhereUniqueWithoutDebtInput | Prisma.DebtPaymentUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.DebtPaymentCreateManyDebtInputEnvelope;
    set?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    disconnect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    delete?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    update?: Prisma.DebtPaymentUpdateWithWhereUniqueWithoutDebtInput | Prisma.DebtPaymentUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.DebtPaymentUpdateManyWithWhereWithoutDebtInput | Prisma.DebtPaymentUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
};
export type DebtPaymentCreateNestedManyWithoutInstallmentInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput> | Prisma.DebtPaymentCreateWithoutInstallmentInput[] | Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput | Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput[];
    createMany?: Prisma.DebtPaymentCreateManyInstallmentInputEnvelope;
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
};
export type DebtPaymentUncheckedCreateNestedManyWithoutInstallmentInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput> | Prisma.DebtPaymentCreateWithoutInstallmentInput[] | Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput | Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput[];
    createMany?: Prisma.DebtPaymentCreateManyInstallmentInputEnvelope;
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
};
export type DebtPaymentUpdateManyWithoutInstallmentNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput> | Prisma.DebtPaymentCreateWithoutInstallmentInput[] | Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput | Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput[];
    upsert?: Prisma.DebtPaymentUpsertWithWhereUniqueWithoutInstallmentInput | Prisma.DebtPaymentUpsertWithWhereUniqueWithoutInstallmentInput[];
    createMany?: Prisma.DebtPaymentCreateManyInstallmentInputEnvelope;
    set?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    disconnect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    delete?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    update?: Prisma.DebtPaymentUpdateWithWhereUniqueWithoutInstallmentInput | Prisma.DebtPaymentUpdateWithWhereUniqueWithoutInstallmentInput[];
    updateMany?: Prisma.DebtPaymentUpdateManyWithWhereWithoutInstallmentInput | Prisma.DebtPaymentUpdateManyWithWhereWithoutInstallmentInput[];
    deleteMany?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
};
export type DebtPaymentUncheckedUpdateManyWithoutInstallmentNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPaymentCreateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput> | Prisma.DebtPaymentCreateWithoutInstallmentInput[] | Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput[];
    connectOrCreate?: Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput | Prisma.DebtPaymentCreateOrConnectWithoutInstallmentInput[];
    upsert?: Prisma.DebtPaymentUpsertWithWhereUniqueWithoutInstallmentInput | Prisma.DebtPaymentUpsertWithWhereUniqueWithoutInstallmentInput[];
    createMany?: Prisma.DebtPaymentCreateManyInstallmentInputEnvelope;
    set?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    disconnect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    delete?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    connect?: Prisma.DebtPaymentWhereUniqueInput | Prisma.DebtPaymentWhereUniqueInput[];
    update?: Prisma.DebtPaymentUpdateWithWhereUniqueWithoutInstallmentInput | Prisma.DebtPaymentUpdateWithWhereUniqueWithoutInstallmentInput[];
    updateMany?: Prisma.DebtPaymentUpdateManyWithWhereWithoutInstallmentInput | Prisma.DebtPaymentUpdateManyWithWhereWithoutInstallmentInput[];
    deleteMany?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
};
export type DebtPaymentCreateWithoutUserInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    debt: Prisma.DebtCreateNestedOneWithoutPaymentsInput;
    installment?: Prisma.DebtInstallmentCreateNestedOneWithoutPaymentsInput;
};
export type DebtPaymentUncheckedCreateWithoutUserInput = {
    id?: string;
    debtId: string;
    installmentId?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentCreateOrConnectWithoutUserInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPaymentCreateWithoutUserInput, Prisma.DebtPaymentUncheckedCreateWithoutUserInput>;
};
export type DebtPaymentCreateManyUserInputEnvelope = {
    data: Prisma.DebtPaymentCreateManyUserInput | Prisma.DebtPaymentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DebtPaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtPaymentUpdateWithoutUserInput, Prisma.DebtPaymentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DebtPaymentCreateWithoutUserInput, Prisma.DebtPaymentUncheckedCreateWithoutUserInput>;
};
export type DebtPaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateWithoutUserInput, Prisma.DebtPaymentUncheckedUpdateWithoutUserInput>;
};
export type DebtPaymentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DebtPaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateManyMutationInput, Prisma.DebtPaymentUncheckedUpdateManyWithoutUserInput>;
};
export type DebtPaymentScalarWhereInput = {
    AND?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
    OR?: Prisma.DebtPaymentScalarWhereInput[];
    NOT?: Prisma.DebtPaymentScalarWhereInput | Prisma.DebtPaymentScalarWhereInput[];
    id?: Prisma.UuidFilter<"DebtPayment"> | string;
    debtId?: Prisma.UuidFilter<"DebtPayment"> | string;
    installmentId?: Prisma.UuidNullableFilter<"DebtPayment"> | string | null;
    userId?: Prisma.UuidFilter<"DebtPayment"> | string;
    amount?: Prisma.DecimalFilter<"DebtPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFilter<"DebtPayment"> | Date | string;
    note?: Prisma.StringNullableFilter<"DebtPayment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtPayment"> | Date | string;
};
export type DebtPaymentCreateWithoutDebtInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    installment?: Prisma.DebtInstallmentCreateNestedOneWithoutPaymentsInput;
    user: Prisma.UserCreateNestedOneWithoutDebtPaymentsInput;
};
export type DebtPaymentUncheckedCreateWithoutDebtInput = {
    id?: string;
    installmentId?: string | null;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentCreateOrConnectWithoutDebtInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPaymentCreateWithoutDebtInput, Prisma.DebtPaymentUncheckedCreateWithoutDebtInput>;
};
export type DebtPaymentCreateManyDebtInputEnvelope = {
    data: Prisma.DebtPaymentCreateManyDebtInput | Prisma.DebtPaymentCreateManyDebtInput[];
    skipDuplicates?: boolean;
};
export type DebtPaymentUpsertWithWhereUniqueWithoutDebtInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtPaymentUpdateWithoutDebtInput, Prisma.DebtPaymentUncheckedUpdateWithoutDebtInput>;
    create: Prisma.XOR<Prisma.DebtPaymentCreateWithoutDebtInput, Prisma.DebtPaymentUncheckedCreateWithoutDebtInput>;
};
export type DebtPaymentUpdateWithWhereUniqueWithoutDebtInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateWithoutDebtInput, Prisma.DebtPaymentUncheckedUpdateWithoutDebtInput>;
};
export type DebtPaymentUpdateManyWithWhereWithoutDebtInput = {
    where: Prisma.DebtPaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateManyMutationInput, Prisma.DebtPaymentUncheckedUpdateManyWithoutDebtInput>;
};
export type DebtPaymentCreateWithoutInstallmentInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
    debt: Prisma.DebtCreateNestedOneWithoutPaymentsInput;
    user: Prisma.UserCreateNestedOneWithoutDebtPaymentsInput;
};
export type DebtPaymentUncheckedCreateWithoutInstallmentInput = {
    id?: string;
    debtId: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentCreateOrConnectWithoutInstallmentInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPaymentCreateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput>;
};
export type DebtPaymentCreateManyInstallmentInputEnvelope = {
    data: Prisma.DebtPaymentCreateManyInstallmentInput | Prisma.DebtPaymentCreateManyInstallmentInput[];
    skipDuplicates?: boolean;
};
export type DebtPaymentUpsertWithWhereUniqueWithoutInstallmentInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtPaymentUpdateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedUpdateWithoutInstallmentInput>;
    create: Prisma.XOR<Prisma.DebtPaymentCreateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedCreateWithoutInstallmentInput>;
};
export type DebtPaymentUpdateWithWhereUniqueWithoutInstallmentInput = {
    where: Prisma.DebtPaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateWithoutInstallmentInput, Prisma.DebtPaymentUncheckedUpdateWithoutInstallmentInput>;
};
export type DebtPaymentUpdateManyWithWhereWithoutInstallmentInput = {
    where: Prisma.DebtPaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateManyMutationInput, Prisma.DebtPaymentUncheckedUpdateManyWithoutInstallmentInput>;
};
export type DebtPaymentCreateManyUserInput = {
    id?: string;
    debtId: string;
    installmentId?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutPaymentsNestedInput;
    installment?: Prisma.DebtInstallmentUpdateOneWithoutPaymentsNestedInput;
};
export type DebtPaymentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentCreateManyDebtInput = {
    id?: string;
    installmentId?: string | null;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installment?: Prisma.DebtInstallmentUpdateOneWithoutPaymentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutDebtPaymentsNestedInput;
};
export type DebtPaymentUncheckedUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentUncheckedUpdateManyWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentCreateManyInstallmentInput = {
    id?: string;
    debtId: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Date | string;
    note?: string | null;
    createdAt?: Date | string;
};
export type DebtPaymentUpdateWithoutInstallmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutPaymentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutDebtPaymentsNestedInput;
};
export type DebtPaymentUncheckedUpdateWithoutInstallmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentUncheckedUpdateManyWithoutInstallmentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paymentDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    debtId?: boolean;
    installmentId?: boolean;
    userId?: boolean;
    amount?: boolean;
    paymentDate?: boolean;
    note?: boolean;
    createdAt?: boolean;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    installment?: boolean | Prisma.DebtPayment$installmentArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayment"]>;
export type DebtPaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    debtId?: boolean;
    installmentId?: boolean;
    userId?: boolean;
    amount?: boolean;
    paymentDate?: boolean;
    note?: boolean;
    createdAt?: boolean;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    installment?: boolean | Prisma.DebtPayment$installmentArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayment"]>;
export type DebtPaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    debtId?: boolean;
    installmentId?: boolean;
    userId?: boolean;
    amount?: boolean;
    paymentDate?: boolean;
    note?: boolean;
    createdAt?: boolean;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    installment?: boolean | Prisma.DebtPayment$installmentArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayment"]>;
export type DebtPaymentSelectScalar = {
    id?: boolean;
    debtId?: boolean;
    installmentId?: boolean;
    userId?: boolean;
    amount?: boolean;
    paymentDate?: boolean;
    note?: boolean;
    createdAt?: boolean;
};
export type DebtPaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "debtId" | "installmentId" | "userId" | "amount" | "paymentDate" | "note" | "createdAt", ExtArgs["result"]["debtPayment"]>;
export type DebtPaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    installment?: boolean | Prisma.DebtPayment$installmentArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DebtPaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    installment?: boolean | Prisma.DebtPayment$installmentArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DebtPaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    installment?: boolean | Prisma.DebtPayment$installmentArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DebtPaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DebtPayment";
    objects: {
        debt: Prisma.$DebtPayload<ExtArgs>;
        installment: Prisma.$DebtInstallmentPayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        debtId: string;
        installmentId: string | null;
        userId: string;
        amount: runtime.Decimal;
        paymentDate: Date;
        note: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["debtPayment"]>;
    composites: {};
};
export type DebtPaymentGetPayload<S extends boolean | null | undefined | DebtPaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload, S>;
export type DebtPaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DebtPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DebtPaymentCountAggregateInputType | true;
};
export interface DebtPaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DebtPayment'];
        meta: {
            name: 'DebtPayment';
        };
    };
    findUnique<T extends DebtPaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, DebtPaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DebtPaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DebtPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DebtPaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, DebtPaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DebtPaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DebtPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DebtPaymentFindManyArgs>(args?: Prisma.SelectSubset<T, DebtPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DebtPaymentCreateArgs>(args: Prisma.SelectSubset<T, DebtPaymentCreateArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DebtPaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, DebtPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DebtPaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DebtPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DebtPaymentDeleteArgs>(args: Prisma.SelectSubset<T, DebtPaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DebtPaymentUpdateArgs>(args: Prisma.SelectSubset<T, DebtPaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DebtPaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, DebtPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DebtPaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, DebtPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DebtPaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DebtPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DebtPaymentUpsertArgs>(args: Prisma.SelectSubset<T, DebtPaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__DebtPaymentClient<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DebtPaymentCountArgs>(args?: Prisma.Subset<T, DebtPaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DebtPaymentCountAggregateOutputType> : number>;
    aggregate<T extends DebtPaymentAggregateArgs>(args: Prisma.Subset<T, DebtPaymentAggregateArgs>): Prisma.PrismaPromise<GetDebtPaymentAggregateType<T>>;
    groupBy<T extends DebtPaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DebtPaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: DebtPaymentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DebtPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DebtPaymentFieldRefs;
}
export interface Prisma__DebtPaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    debt<T extends Prisma.DebtDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtDefaultArgs<ExtArgs>>): Prisma.Prisma__DebtClient<runtime.Types.Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    installment<T extends Prisma.DebtPayment$installmentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtPayment$installmentArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DebtPaymentFieldRefs {
    readonly id: Prisma.FieldRef<"DebtPayment", 'String'>;
    readonly debtId: Prisma.FieldRef<"DebtPayment", 'String'>;
    readonly installmentId: Prisma.FieldRef<"DebtPayment", 'String'>;
    readonly userId: Prisma.FieldRef<"DebtPayment", 'String'>;
    readonly amount: Prisma.FieldRef<"DebtPayment", 'Decimal'>;
    readonly paymentDate: Prisma.FieldRef<"DebtPayment", 'DateTime'>;
    readonly note: Prisma.FieldRef<"DebtPayment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"DebtPayment", 'DateTime'>;
}
export type DebtPaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where: Prisma.DebtPaymentWhereUniqueInput;
};
export type DebtPaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where: Prisma.DebtPaymentWhereUniqueInput;
};
export type DebtPaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where?: Prisma.DebtPaymentWhereInput;
    orderBy?: Prisma.DebtPaymentOrderByWithRelationInput | Prisma.DebtPaymentOrderByWithRelationInput[];
    cursor?: Prisma.DebtPaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPaymentScalarFieldEnum | Prisma.DebtPaymentScalarFieldEnum[];
};
export type DebtPaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where?: Prisma.DebtPaymentWhereInput;
    orderBy?: Prisma.DebtPaymentOrderByWithRelationInput | Prisma.DebtPaymentOrderByWithRelationInput[];
    cursor?: Prisma.DebtPaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPaymentScalarFieldEnum | Prisma.DebtPaymentScalarFieldEnum[];
};
export type DebtPaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where?: Prisma.DebtPaymentWhereInput;
    orderBy?: Prisma.DebtPaymentOrderByWithRelationInput | Prisma.DebtPaymentOrderByWithRelationInput[];
    cursor?: Prisma.DebtPaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPaymentScalarFieldEnum | Prisma.DebtPaymentScalarFieldEnum[];
};
export type DebtPaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPaymentCreateInput, Prisma.DebtPaymentUncheckedCreateInput>;
};
export type DebtPaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DebtPaymentCreateManyInput | Prisma.DebtPaymentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DebtPaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    data: Prisma.DebtPaymentCreateManyInput | Prisma.DebtPaymentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DebtPaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DebtPaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateInput, Prisma.DebtPaymentUncheckedUpdateInput>;
    where: Prisma.DebtPaymentWhereUniqueInput;
};
export type DebtPaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DebtPaymentUpdateManyMutationInput, Prisma.DebtPaymentUncheckedUpdateManyInput>;
    where?: Prisma.DebtPaymentWhereInput;
    limit?: number;
};
export type DebtPaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPaymentUpdateManyMutationInput, Prisma.DebtPaymentUncheckedUpdateManyInput>;
    where?: Prisma.DebtPaymentWhereInput;
    limit?: number;
    include?: Prisma.DebtPaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DebtPaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where: Prisma.DebtPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPaymentCreateInput, Prisma.DebtPaymentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DebtPaymentUpdateInput, Prisma.DebtPaymentUncheckedUpdateInput>;
};
export type DebtPaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
    where: Prisma.DebtPaymentWhereUniqueInput;
};
export type DebtPaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPaymentWhereInput;
    limit?: number;
};
export type DebtPayment$installmentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where?: Prisma.DebtInstallmentWhereInput;
};
export type DebtPaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPaymentSelect<ExtArgs> | null;
    omit?: Prisma.DebtPaymentOmit<ExtArgs> | null;
    include?: Prisma.DebtPaymentInclude<ExtArgs> | null;
};
