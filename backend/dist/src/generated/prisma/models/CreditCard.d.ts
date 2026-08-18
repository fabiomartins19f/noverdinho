import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CreditCardModel = runtime.Types.Result.DefaultSelection<Prisma.$CreditCardPayload>;
export type AggregateCreditCard = {
    _count: CreditCardCountAggregateOutputType | null;
    _avg: CreditCardAvgAggregateOutputType | null;
    _sum: CreditCardSumAggregateOutputType | null;
    _min: CreditCardMinAggregateOutputType | null;
    _max: CreditCardMaxAggregateOutputType | null;
};
export type CreditCardAvgAggregateOutputType = {
    limit: runtime.Decimal | null;
    closingDay: number | null;
    dueDay: number | null;
};
export type CreditCardSumAggregateOutputType = {
    limit: runtime.Decimal | null;
    closingDay: number | null;
    dueDay: number | null;
};
export type CreditCardMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    institution: string | null;
    limit: runtime.Decimal | null;
    closingDay: number | null;
    dueDay: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    institution: string | null;
    limit: runtime.Decimal | null;
    closingDay: number | null;
    dueDay: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    institution: number;
    limit: number;
    closingDay: number;
    dueDay: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CreditCardAvgAggregateInputType = {
    limit?: true;
    closingDay?: true;
    dueDay?: true;
};
export type CreditCardSumAggregateInputType = {
    limit?: true;
    closingDay?: true;
    dueDay?: true;
};
export type CreditCardMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    institution?: true;
    limit?: true;
    closingDay?: true;
    dueDay?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    institution?: true;
    limit?: true;
    closingDay?: true;
    dueDay?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    institution?: true;
    limit?: true;
    closingDay?: true;
    dueDay?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CreditCardAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardWhereInput;
    orderBy?: Prisma.CreditCardOrderByWithRelationInput | Prisma.CreditCardOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CreditCardCountAggregateInputType;
    _avg?: CreditCardAvgAggregateInputType;
    _sum?: CreditCardSumAggregateInputType;
    _min?: CreditCardMinAggregateInputType;
    _max?: CreditCardMaxAggregateInputType;
};
export type GetCreditCardAggregateType<T extends CreditCardAggregateArgs> = {
    [P in keyof T & keyof AggregateCreditCard]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCreditCard[P]> : Prisma.GetScalarType<T[P], AggregateCreditCard[P]>;
};
export type CreditCardGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardWhereInput;
    orderBy?: Prisma.CreditCardOrderByWithAggregationInput | Prisma.CreditCardOrderByWithAggregationInput[];
    by: Prisma.CreditCardScalarFieldEnum[] | Prisma.CreditCardScalarFieldEnum;
    having?: Prisma.CreditCardScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CreditCardCountAggregateInputType | true;
    _avg?: CreditCardAvgAggregateInputType;
    _sum?: CreditCardSumAggregateInputType;
    _min?: CreditCardMinAggregateInputType;
    _max?: CreditCardMaxAggregateInputType;
};
export type CreditCardGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    institution: string | null;
    limit: runtime.Decimal;
    closingDay: number;
    dueDay: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: CreditCardCountAggregateOutputType | null;
    _avg: CreditCardAvgAggregateOutputType | null;
    _sum: CreditCardSumAggregateOutputType | null;
    _min: CreditCardMinAggregateOutputType | null;
    _max: CreditCardMaxAggregateOutputType | null;
};
export type GetCreditCardGroupByPayload<T extends CreditCardGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CreditCardGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CreditCardGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CreditCardGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CreditCardGroupByOutputType[P]>;
}>>;
export type CreditCardWhereInput = {
    AND?: Prisma.CreditCardWhereInput | Prisma.CreditCardWhereInput[];
    OR?: Prisma.CreditCardWhereInput[];
    NOT?: Prisma.CreditCardWhereInput | Prisma.CreditCardWhereInput[];
    id?: Prisma.UuidFilter<"CreditCard"> | string;
    userId?: Prisma.UuidFilter<"CreditCard"> | string;
    name?: Prisma.StringFilter<"CreditCard"> | string;
    institution?: Prisma.StringNullableFilter<"CreditCard"> | string | null;
    limit?: Prisma.DecimalFilter<"CreditCard"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFilter<"CreditCard"> | number;
    dueDay?: Prisma.IntFilter<"CreditCard"> | number;
    isActive?: Prisma.BoolFilter<"CreditCard"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"CreditCard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCard"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    invoices?: Prisma.CreditCardInvoiceListRelationFilter;
    purchases?: Prisma.CreditCardPurchaseListRelationFilter;
    installments?: Prisma.CreditCardInstallmentListRelationFilter;
};
export type CreditCardOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    institution?: Prisma.SortOrderInput | Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    invoices?: Prisma.CreditCardInvoiceOrderByRelationAggregateInput;
    purchases?: Prisma.CreditCardPurchaseOrderByRelationAggregateInput;
    installments?: Prisma.CreditCardInstallmentOrderByRelationAggregateInput;
};
export type CreditCardWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CreditCardWhereInput | Prisma.CreditCardWhereInput[];
    OR?: Prisma.CreditCardWhereInput[];
    NOT?: Prisma.CreditCardWhereInput | Prisma.CreditCardWhereInput[];
    userId?: Prisma.UuidFilter<"CreditCard"> | string;
    name?: Prisma.StringFilter<"CreditCard"> | string;
    institution?: Prisma.StringNullableFilter<"CreditCard"> | string | null;
    limit?: Prisma.DecimalFilter<"CreditCard"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFilter<"CreditCard"> | number;
    dueDay?: Prisma.IntFilter<"CreditCard"> | number;
    isActive?: Prisma.BoolFilter<"CreditCard"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"CreditCard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCard"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    invoices?: Prisma.CreditCardInvoiceListRelationFilter;
    purchases?: Prisma.CreditCardPurchaseListRelationFilter;
    installments?: Prisma.CreditCardInstallmentListRelationFilter;
}, "id">;
export type CreditCardOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    institution?: Prisma.SortOrderInput | Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CreditCardCountOrderByAggregateInput;
    _avg?: Prisma.CreditCardAvgOrderByAggregateInput;
    _max?: Prisma.CreditCardMaxOrderByAggregateInput;
    _min?: Prisma.CreditCardMinOrderByAggregateInput;
    _sum?: Prisma.CreditCardSumOrderByAggregateInput;
};
export type CreditCardScalarWhereWithAggregatesInput = {
    AND?: Prisma.CreditCardScalarWhereWithAggregatesInput | Prisma.CreditCardScalarWhereWithAggregatesInput[];
    OR?: Prisma.CreditCardScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CreditCardScalarWhereWithAggregatesInput | Prisma.CreditCardScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CreditCard"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CreditCard"> | string;
    name?: Prisma.StringWithAggregatesFilter<"CreditCard"> | string;
    institution?: Prisma.StringNullableWithAggregatesFilter<"CreditCard"> | string | null;
    limit?: Prisma.DecimalWithAggregatesFilter<"CreditCard"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntWithAggregatesFilter<"CreditCard"> | number;
    dueDay?: Prisma.IntWithAggregatesFilter<"CreditCard"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"CreditCard"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCard"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCard"> | Date | string;
};
export type CreditCardCreateInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCardsInput;
    invoices?: Prisma.CreditCardInvoiceCreateNestedManyWithoutCardInput;
    purchases?: Prisma.CreditCardPurchaseCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutCardInput;
};
export type CreditCardUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedCreateNestedManyWithoutCardInput;
    purchases?: Prisma.CreditCardPurchaseUncheckedCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutCardInput;
};
export type CreditCardUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCardsNestedInput;
    invoices?: Prisma.CreditCardInvoiceUpdateManyWithoutCardNestedInput;
    purchases?: Prisma.CreditCardPurchaseUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutCardNestedInput;
};
export type CreditCardUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedUpdateManyWithoutCardNestedInput;
    purchases?: Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutCardNestedInput;
};
export type CreditCardCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardListRelationFilter = {
    every?: Prisma.CreditCardWhereInput;
    some?: Prisma.CreditCardWhereInput;
    none?: Prisma.CreditCardWhereInput;
};
export type CreditCardOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CreditCardCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    institution?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardAvgOrderByAggregateInput = {
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
};
export type CreditCardMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    institution?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    institution?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardSumOrderByAggregateInput = {
    limit?: Prisma.SortOrder;
    closingDay?: Prisma.SortOrder;
    dueDay?: Prisma.SortOrder;
};
export type CreditCardScalarRelationFilter = {
    is?: Prisma.CreditCardWhereInput;
    isNot?: Prisma.CreditCardWhereInput;
};
export type CreditCardCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutUserInput, Prisma.CreditCardUncheckedCreateWithoutUserInput> | Prisma.CreditCardCreateWithoutUserInput[] | Prisma.CreditCardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutUserInput | Prisma.CreditCardCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
};
export type CreditCardUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutUserInput, Prisma.CreditCardUncheckedCreateWithoutUserInput> | Prisma.CreditCardCreateWithoutUserInput[] | Prisma.CreditCardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutUserInput | Prisma.CreditCardCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
};
export type CreditCardUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutUserInput, Prisma.CreditCardUncheckedCreateWithoutUserInput> | Prisma.CreditCardCreateWithoutUserInput[] | Prisma.CreditCardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutUserInput | Prisma.CreditCardCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    disconnect?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    delete?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    connect?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    update?: Prisma.CreditCardUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardScalarWhereInput | Prisma.CreditCardScalarWhereInput[];
};
export type CreditCardUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutUserInput, Prisma.CreditCardUncheckedCreateWithoutUserInput> | Prisma.CreditCardCreateWithoutUserInput[] | Prisma.CreditCardUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutUserInput | Prisma.CreditCardCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    disconnect?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    delete?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    connect?: Prisma.CreditCardWhereUniqueInput | Prisma.CreditCardWhereUniqueInput[];
    update?: Prisma.CreditCardUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardScalarWhereInput | Prisma.CreditCardScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type CreditCardCreateNestedOneWithoutInvoicesInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutInvoicesInput, Prisma.CreditCardUncheckedCreateWithoutInvoicesInput>;
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutInvoicesInput;
    connect?: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardUpdateOneRequiredWithoutInvoicesNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutInvoicesInput, Prisma.CreditCardUncheckedCreateWithoutInvoicesInput>;
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutInvoicesInput;
    upsert?: Prisma.CreditCardUpsertWithoutInvoicesInput;
    connect?: Prisma.CreditCardWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CreditCardUpdateToOneWithWhereWithoutInvoicesInput, Prisma.CreditCardUpdateWithoutInvoicesInput>, Prisma.CreditCardUncheckedUpdateWithoutInvoicesInput>;
};
export type CreditCardCreateNestedOneWithoutPurchasesInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutPurchasesInput, Prisma.CreditCardUncheckedCreateWithoutPurchasesInput>;
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutPurchasesInput;
    connect?: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutPurchasesInput, Prisma.CreditCardUncheckedCreateWithoutPurchasesInput>;
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutPurchasesInput;
    upsert?: Prisma.CreditCardUpsertWithoutPurchasesInput;
    connect?: Prisma.CreditCardWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CreditCardUpdateToOneWithWhereWithoutPurchasesInput, Prisma.CreditCardUpdateWithoutPurchasesInput>, Prisma.CreditCardUncheckedUpdateWithoutPurchasesInput>;
};
export type CreditCardCreateNestedOneWithoutInstallmentsInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutInstallmentsInput, Prisma.CreditCardUncheckedCreateWithoutInstallmentsInput>;
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutInstallmentsInput;
    connect?: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardUpdateOneRequiredWithoutInstallmentsNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardCreateWithoutInstallmentsInput, Prisma.CreditCardUncheckedCreateWithoutInstallmentsInput>;
    connectOrCreate?: Prisma.CreditCardCreateOrConnectWithoutInstallmentsInput;
    upsert?: Prisma.CreditCardUpsertWithoutInstallmentsInput;
    connect?: Prisma.CreditCardWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CreditCardUpdateToOneWithWhereWithoutInstallmentsInput, Prisma.CreditCardUpdateWithoutInstallmentsInput>, Prisma.CreditCardUncheckedUpdateWithoutInstallmentsInput>;
};
export type CreditCardCreateWithoutUserInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.CreditCardInvoiceCreateNestedManyWithoutCardInput;
    purchases?: Prisma.CreditCardPurchaseCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutCardInput;
};
export type CreditCardUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedCreateNestedManyWithoutCardInput;
    purchases?: Prisma.CreditCardPurchaseUncheckedCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutCardInput;
};
export type CreditCardCreateOrConnectWithoutUserInput = {
    where: Prisma.CreditCardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutUserInput, Prisma.CreditCardUncheckedCreateWithoutUserInput>;
};
export type CreditCardCreateManyUserInputEnvelope = {
    data: Prisma.CreditCardCreateManyUserInput | Prisma.CreditCardCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CreditCardUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardUpdateWithoutUserInput, Prisma.CreditCardUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutUserInput, Prisma.CreditCardUncheckedCreateWithoutUserInput>;
};
export type CreditCardUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardUpdateWithoutUserInput, Prisma.CreditCardUncheckedUpdateWithoutUserInput>;
};
export type CreditCardUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CreditCardScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardUpdateManyMutationInput, Prisma.CreditCardUncheckedUpdateManyWithoutUserInput>;
};
export type CreditCardScalarWhereInput = {
    AND?: Prisma.CreditCardScalarWhereInput | Prisma.CreditCardScalarWhereInput[];
    OR?: Prisma.CreditCardScalarWhereInput[];
    NOT?: Prisma.CreditCardScalarWhereInput | Prisma.CreditCardScalarWhereInput[];
    id?: Prisma.UuidFilter<"CreditCard"> | string;
    userId?: Prisma.UuidFilter<"CreditCard"> | string;
    name?: Prisma.StringFilter<"CreditCard"> | string;
    institution?: Prisma.StringNullableFilter<"CreditCard"> | string | null;
    limit?: Prisma.DecimalFilter<"CreditCard"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFilter<"CreditCard"> | number;
    dueDay?: Prisma.IntFilter<"CreditCard"> | number;
    isActive?: Prisma.BoolFilter<"CreditCard"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"CreditCard"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCard"> | Date | string;
};
export type CreditCardCreateWithoutInvoicesInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCardsInput;
    purchases?: Prisma.CreditCardPurchaseCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutCardInput;
};
export type CreditCardUncheckedCreateWithoutInvoicesInput = {
    id?: string;
    userId: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    purchases?: Prisma.CreditCardPurchaseUncheckedCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutCardInput;
};
export type CreditCardCreateOrConnectWithoutInvoicesInput = {
    where: Prisma.CreditCardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutInvoicesInput, Prisma.CreditCardUncheckedCreateWithoutInvoicesInput>;
};
export type CreditCardUpsertWithoutInvoicesInput = {
    update: Prisma.XOR<Prisma.CreditCardUpdateWithoutInvoicesInput, Prisma.CreditCardUncheckedUpdateWithoutInvoicesInput>;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutInvoicesInput, Prisma.CreditCardUncheckedCreateWithoutInvoicesInput>;
    where?: Prisma.CreditCardWhereInput;
};
export type CreditCardUpdateToOneWithWhereWithoutInvoicesInput = {
    where?: Prisma.CreditCardWhereInput;
    data: Prisma.XOR<Prisma.CreditCardUpdateWithoutInvoicesInput, Prisma.CreditCardUncheckedUpdateWithoutInvoicesInput>;
};
export type CreditCardUpdateWithoutInvoicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCardsNestedInput;
    purchases?: Prisma.CreditCardPurchaseUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutCardNestedInput;
};
export type CreditCardUncheckedUpdateWithoutInvoicesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    purchases?: Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutCardNestedInput;
};
export type CreditCardCreateWithoutPurchasesInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCardsInput;
    invoices?: Prisma.CreditCardInvoiceCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutCardInput;
};
export type CreditCardUncheckedCreateWithoutPurchasesInput = {
    id?: string;
    userId: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedCreateNestedManyWithoutCardInput;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutCardInput;
};
export type CreditCardCreateOrConnectWithoutPurchasesInput = {
    where: Prisma.CreditCardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutPurchasesInput, Prisma.CreditCardUncheckedCreateWithoutPurchasesInput>;
};
export type CreditCardUpsertWithoutPurchasesInput = {
    update: Prisma.XOR<Prisma.CreditCardUpdateWithoutPurchasesInput, Prisma.CreditCardUncheckedUpdateWithoutPurchasesInput>;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutPurchasesInput, Prisma.CreditCardUncheckedCreateWithoutPurchasesInput>;
    where?: Prisma.CreditCardWhereInput;
};
export type CreditCardUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: Prisma.CreditCardWhereInput;
    data: Prisma.XOR<Prisma.CreditCardUpdateWithoutPurchasesInput, Prisma.CreditCardUncheckedUpdateWithoutPurchasesInput>;
};
export type CreditCardUpdateWithoutPurchasesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCardsNestedInput;
    invoices?: Prisma.CreditCardInvoiceUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutCardNestedInput;
};
export type CreditCardUncheckedUpdateWithoutPurchasesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutCardNestedInput;
};
export type CreditCardCreateWithoutInstallmentsInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutCardsInput;
    invoices?: Prisma.CreditCardInvoiceCreateNestedManyWithoutCardInput;
    purchases?: Prisma.CreditCardPurchaseCreateNestedManyWithoutCardInput;
};
export type CreditCardUncheckedCreateWithoutInstallmentsInput = {
    id?: string;
    userId: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedCreateNestedManyWithoutCardInput;
    purchases?: Prisma.CreditCardPurchaseUncheckedCreateNestedManyWithoutCardInput;
};
export type CreditCardCreateOrConnectWithoutInstallmentsInput = {
    where: Prisma.CreditCardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutInstallmentsInput, Prisma.CreditCardUncheckedCreateWithoutInstallmentsInput>;
};
export type CreditCardUpsertWithoutInstallmentsInput = {
    update: Prisma.XOR<Prisma.CreditCardUpdateWithoutInstallmentsInput, Prisma.CreditCardUncheckedUpdateWithoutInstallmentsInput>;
    create: Prisma.XOR<Prisma.CreditCardCreateWithoutInstallmentsInput, Prisma.CreditCardUncheckedCreateWithoutInstallmentsInput>;
    where?: Prisma.CreditCardWhereInput;
};
export type CreditCardUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: Prisma.CreditCardWhereInput;
    data: Prisma.XOR<Prisma.CreditCardUpdateWithoutInstallmentsInput, Prisma.CreditCardUncheckedUpdateWithoutInstallmentsInput>;
};
export type CreditCardUpdateWithoutInstallmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutCardsNestedInput;
    invoices?: Prisma.CreditCardInvoiceUpdateManyWithoutCardNestedInput;
    purchases?: Prisma.CreditCardPurchaseUpdateManyWithoutCardNestedInput;
};
export type CreditCardUncheckedUpdateWithoutInstallmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedUpdateManyWithoutCardNestedInput;
    purchases?: Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutCardNestedInput;
};
export type CreditCardCreateManyUserInput = {
    id?: string;
    name: string;
    institution?: string | null;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: number;
    dueDay?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.CreditCardInvoiceUpdateManyWithoutCardNestedInput;
    purchases?: Prisma.CreditCardPurchaseUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutCardNestedInput;
};
export type CreditCardUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoices?: Prisma.CreditCardInvoiceUncheckedUpdateManyWithoutCardNestedInput;
    purchases?: Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutCardNestedInput;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutCardNestedInput;
};
export type CreditCardUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    institution?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    closingDay?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDay?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardCountOutputType = {
    invoices: number;
    purchases: number;
    installments: number;
};
export type CreditCardCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoices?: boolean | CreditCardCountOutputTypeCountInvoicesArgs;
    purchases?: boolean | CreditCardCountOutputTypeCountPurchasesArgs;
    installments?: boolean | CreditCardCountOutputTypeCountInstallmentsArgs;
};
export type CreditCardCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardCountOutputTypeSelect<ExtArgs> | null;
};
export type CreditCardCountOutputTypeCountInvoicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInvoiceWhereInput;
};
export type CreditCardCountOutputTypeCountPurchasesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardPurchaseWhereInput;
};
export type CreditCardCountOutputTypeCountInstallmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInstallmentWhereInput;
};
export type CreditCardSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    institution?: boolean;
    limit?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoices?: boolean | Prisma.CreditCard$invoicesArgs<ExtArgs>;
    purchases?: boolean | Prisma.CreditCard$purchasesArgs<ExtArgs>;
    installments?: boolean | Prisma.CreditCard$installmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CreditCardCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCard"]>;
export type CreditCardSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    institution?: boolean;
    limit?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCard"]>;
export type CreditCardSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    institution?: boolean;
    limit?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCard"]>;
export type CreditCardSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    institution?: boolean;
    limit?: boolean;
    closingDay?: boolean;
    dueDay?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CreditCardOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "institution" | "limit" | "closingDay" | "dueDay" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["creditCard"]>;
export type CreditCardInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    invoices?: boolean | Prisma.CreditCard$invoicesArgs<ExtArgs>;
    purchases?: boolean | Prisma.CreditCard$purchasesArgs<ExtArgs>;
    installments?: boolean | Prisma.CreditCard$installmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CreditCardCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CreditCardIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CreditCardIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CreditCardPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CreditCard";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        invoices: Prisma.$CreditCardInvoicePayload<ExtArgs>[];
        purchases: Prisma.$CreditCardPurchasePayload<ExtArgs>[];
        installments: Prisma.$CreditCardInstallmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        institution: string | null;
        limit: runtime.Decimal;
        closingDay: number;
        dueDay: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["creditCard"]>;
    composites: {};
};
export type CreditCardGetPayload<S extends boolean | null | undefined | CreditCardDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CreditCardPayload, S>;
export type CreditCardCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CreditCardFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CreditCardCountAggregateInputType | true;
};
export interface CreditCardDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CreditCard'];
        meta: {
            name: 'CreditCard';
        };
    };
    findUnique<T extends CreditCardFindUniqueArgs>(args: Prisma.SelectSubset<T, CreditCardFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CreditCardFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CreditCardFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CreditCardFindFirstArgs>(args?: Prisma.SelectSubset<T, CreditCardFindFirstArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CreditCardFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CreditCardFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CreditCardFindManyArgs>(args?: Prisma.SelectSubset<T, CreditCardFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CreditCardCreateArgs>(args: Prisma.SelectSubset<T, CreditCardCreateArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CreditCardCreateManyArgs>(args?: Prisma.SelectSubset<T, CreditCardCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CreditCardCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CreditCardCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CreditCardDeleteArgs>(args: Prisma.SelectSubset<T, CreditCardDeleteArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CreditCardUpdateArgs>(args: Prisma.SelectSubset<T, CreditCardUpdateArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CreditCardDeleteManyArgs>(args?: Prisma.SelectSubset<T, CreditCardDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CreditCardUpdateManyArgs>(args: Prisma.SelectSubset<T, CreditCardUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CreditCardUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CreditCardUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CreditCardUpsertArgs>(args: Prisma.SelectSubset<T, CreditCardUpsertArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CreditCardCountArgs>(args?: Prisma.Subset<T, CreditCardCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CreditCardCountAggregateOutputType> : number>;
    aggregate<T extends CreditCardAggregateArgs>(args: Prisma.Subset<T, CreditCardAggregateArgs>): Prisma.PrismaPromise<GetCreditCardAggregateType<T>>;
    groupBy<T extends CreditCardGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CreditCardGroupByArgs['orderBy'];
    } : {
        orderBy?: CreditCardGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CreditCardGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditCardGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CreditCardFieldRefs;
}
export interface Prisma__CreditCardClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    invoices<T extends Prisma.CreditCard$invoicesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCard$invoicesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    purchases<T extends Prisma.CreditCard$purchasesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCard$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    installments<T extends Prisma.CreditCard$installmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCard$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CreditCardFieldRefs {
    readonly id: Prisma.FieldRef<"CreditCard", 'String'>;
    readonly userId: Prisma.FieldRef<"CreditCard", 'String'>;
    readonly name: Prisma.FieldRef<"CreditCard", 'String'>;
    readonly institution: Prisma.FieldRef<"CreditCard", 'String'>;
    readonly limit: Prisma.FieldRef<"CreditCard", 'Decimal'>;
    readonly closingDay: Prisma.FieldRef<"CreditCard", 'Int'>;
    readonly dueDay: Prisma.FieldRef<"CreditCard", 'Int'>;
    readonly isActive: Prisma.FieldRef<"CreditCard", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"CreditCard", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CreditCard", 'DateTime'>;
}
export type CreditCardFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where?: Prisma.CreditCardWhereInput;
    orderBy?: Prisma.CreditCardOrderByWithRelationInput | Prisma.CreditCardOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardScalarFieldEnum | Prisma.CreditCardScalarFieldEnum[];
};
export type CreditCardFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where?: Prisma.CreditCardWhereInput;
    orderBy?: Prisma.CreditCardOrderByWithRelationInput | Prisma.CreditCardOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardScalarFieldEnum | Prisma.CreditCardScalarFieldEnum[];
};
export type CreditCardFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where?: Prisma.CreditCardWhereInput;
    orderBy?: Prisma.CreditCardOrderByWithRelationInput | Prisma.CreditCardOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardScalarFieldEnum | Prisma.CreditCardScalarFieldEnum[];
};
export type CreditCardCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardCreateInput, Prisma.CreditCardUncheckedCreateInput>;
};
export type CreditCardCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CreditCardCreateManyInput | Prisma.CreditCardCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CreditCardCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    data: Prisma.CreditCardCreateManyInput | Prisma.CreditCardCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CreditCardIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CreditCardUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardUpdateInput, Prisma.CreditCardUncheckedUpdateInput>;
    where: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CreditCardUpdateManyMutationInput, Prisma.CreditCardUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardWhereInput;
    limit?: number;
};
export type CreditCardUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardUpdateManyMutationInput, Prisma.CreditCardUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardWhereInput;
    limit?: number;
    include?: Prisma.CreditCardIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CreditCardUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where: Prisma.CreditCardWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardCreateInput, Prisma.CreditCardUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CreditCardUpdateInput, Prisma.CreditCardUncheckedUpdateInput>;
};
export type CreditCardDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
    where: Prisma.CreditCardWhereUniqueInput;
};
export type CreditCardDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardWhereInput;
    limit?: number;
};
export type CreditCard$invoicesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    where?: Prisma.CreditCardInvoiceWhereInput;
    orderBy?: Prisma.CreditCardInvoiceOrderByWithRelationInput | Prisma.CreditCardInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardInvoiceScalarFieldEnum | Prisma.CreditCardInvoiceScalarFieldEnum[];
};
export type CreditCard$purchasesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    where?: Prisma.CreditCardPurchaseWhereInput;
    orderBy?: Prisma.CreditCardPurchaseOrderByWithRelationInput | Prisma.CreditCardPurchaseOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardPurchaseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardPurchaseScalarFieldEnum | Prisma.CreditCardPurchaseScalarFieldEnum[];
};
export type CreditCard$installmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInclude<ExtArgs> | null;
};
