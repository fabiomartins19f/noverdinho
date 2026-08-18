import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CreditCardPurchaseModel = runtime.Types.Result.DefaultSelection<Prisma.$CreditCardPurchasePayload>;
export type AggregateCreditCardPurchase = {
    _count: CreditCardPurchaseCountAggregateOutputType | null;
    _avg: CreditCardPurchaseAvgAggregateOutputType | null;
    _sum: CreditCardPurchaseSumAggregateOutputType | null;
    _min: CreditCardPurchaseMinAggregateOutputType | null;
    _max: CreditCardPurchaseMaxAggregateOutputType | null;
};
export type CreditCardPurchaseAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
    installmentCount: number | null;
};
export type CreditCardPurchaseSumAggregateOutputType = {
    amount: runtime.Decimal | null;
    installmentCount: number | null;
};
export type CreditCardPurchaseMinAggregateOutputType = {
    id: string | null;
    cardId: string | null;
    userId: string | null;
    categoryId: string | null;
    description: string | null;
    amount: runtime.Decimal | null;
    purchaseDate: Date | null;
    installmentCount: number | null;
    createdAt: Date | null;
};
export type CreditCardPurchaseMaxAggregateOutputType = {
    id: string | null;
    cardId: string | null;
    userId: string | null;
    categoryId: string | null;
    description: string | null;
    amount: runtime.Decimal | null;
    purchaseDate: Date | null;
    installmentCount: number | null;
    createdAt: Date | null;
};
export type CreditCardPurchaseCountAggregateOutputType = {
    id: number;
    cardId: number;
    userId: number;
    categoryId: number;
    description: number;
    amount: number;
    purchaseDate: number;
    installmentCount: number;
    createdAt: number;
    _all: number;
};
export type CreditCardPurchaseAvgAggregateInputType = {
    amount?: true;
    installmentCount?: true;
};
export type CreditCardPurchaseSumAggregateInputType = {
    amount?: true;
    installmentCount?: true;
};
export type CreditCardPurchaseMinAggregateInputType = {
    id?: true;
    cardId?: true;
    userId?: true;
    categoryId?: true;
    description?: true;
    amount?: true;
    purchaseDate?: true;
    installmentCount?: true;
    createdAt?: true;
};
export type CreditCardPurchaseMaxAggregateInputType = {
    id?: true;
    cardId?: true;
    userId?: true;
    categoryId?: true;
    description?: true;
    amount?: true;
    purchaseDate?: true;
    installmentCount?: true;
    createdAt?: true;
};
export type CreditCardPurchaseCountAggregateInputType = {
    id?: true;
    cardId?: true;
    userId?: true;
    categoryId?: true;
    description?: true;
    amount?: true;
    purchaseDate?: true;
    installmentCount?: true;
    createdAt?: true;
    _all?: true;
};
export type CreditCardPurchaseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardPurchaseWhereInput;
    orderBy?: Prisma.CreditCardPurchaseOrderByWithRelationInput | Prisma.CreditCardPurchaseOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardPurchaseWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CreditCardPurchaseCountAggregateInputType;
    _avg?: CreditCardPurchaseAvgAggregateInputType;
    _sum?: CreditCardPurchaseSumAggregateInputType;
    _min?: CreditCardPurchaseMinAggregateInputType;
    _max?: CreditCardPurchaseMaxAggregateInputType;
};
export type GetCreditCardPurchaseAggregateType<T extends CreditCardPurchaseAggregateArgs> = {
    [P in keyof T & keyof AggregateCreditCardPurchase]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCreditCardPurchase[P]> : Prisma.GetScalarType<T[P], AggregateCreditCardPurchase[P]>;
};
export type CreditCardPurchaseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardPurchaseWhereInput;
    orderBy?: Prisma.CreditCardPurchaseOrderByWithAggregationInput | Prisma.CreditCardPurchaseOrderByWithAggregationInput[];
    by: Prisma.CreditCardPurchaseScalarFieldEnum[] | Prisma.CreditCardPurchaseScalarFieldEnum;
    having?: Prisma.CreditCardPurchaseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CreditCardPurchaseCountAggregateInputType | true;
    _avg?: CreditCardPurchaseAvgAggregateInputType;
    _sum?: CreditCardPurchaseSumAggregateInputType;
    _min?: CreditCardPurchaseMinAggregateInputType;
    _max?: CreditCardPurchaseMaxAggregateInputType;
};
export type CreditCardPurchaseGroupByOutputType = {
    id: string;
    cardId: string;
    userId: string;
    categoryId: string | null;
    description: string;
    amount: runtime.Decimal;
    purchaseDate: Date;
    installmentCount: number;
    createdAt: Date;
    _count: CreditCardPurchaseCountAggregateOutputType | null;
    _avg: CreditCardPurchaseAvgAggregateOutputType | null;
    _sum: CreditCardPurchaseSumAggregateOutputType | null;
    _min: CreditCardPurchaseMinAggregateOutputType | null;
    _max: CreditCardPurchaseMaxAggregateOutputType | null;
};
export type GetCreditCardPurchaseGroupByPayload<T extends CreditCardPurchaseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CreditCardPurchaseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CreditCardPurchaseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CreditCardPurchaseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CreditCardPurchaseGroupByOutputType[P]>;
}>>;
export type CreditCardPurchaseWhereInput = {
    AND?: Prisma.CreditCardPurchaseWhereInput | Prisma.CreditCardPurchaseWhereInput[];
    OR?: Prisma.CreditCardPurchaseWhereInput[];
    NOT?: Prisma.CreditCardPurchaseWhereInput | Prisma.CreditCardPurchaseWhereInput[];
    id?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    userId?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    categoryId?: Prisma.StringNullableFilter<"CreditCardPurchase"> | string | null;
    description?: Prisma.StringFilter<"CreditCardPurchase"> | string;
    amount?: Prisma.DecimalFilter<"CreditCardPurchase"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFilter<"CreditCardPurchase"> | Date | string;
    installmentCount?: Prisma.IntFilter<"CreditCardPurchase"> | number;
    createdAt?: Prisma.DateTimeFilter<"CreditCardPurchase"> | Date | string;
    card?: Prisma.XOR<Prisma.CreditCardScalarRelationFilter, Prisma.CreditCardWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    installments?: Prisma.CreditCardInstallmentListRelationFilter;
};
export type CreditCardPurchaseOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    card?: Prisma.CreditCardOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    category?: Prisma.CategoryOrderByWithRelationInput;
    installments?: Prisma.CreditCardInstallmentOrderByRelationAggregateInput;
};
export type CreditCardPurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CreditCardPurchaseWhereInput | Prisma.CreditCardPurchaseWhereInput[];
    OR?: Prisma.CreditCardPurchaseWhereInput[];
    NOT?: Prisma.CreditCardPurchaseWhereInput | Prisma.CreditCardPurchaseWhereInput[];
    cardId?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    userId?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    categoryId?: Prisma.StringNullableFilter<"CreditCardPurchase"> | string | null;
    description?: Prisma.StringFilter<"CreditCardPurchase"> | string;
    amount?: Prisma.DecimalFilter<"CreditCardPurchase"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFilter<"CreditCardPurchase"> | Date | string;
    installmentCount?: Prisma.IntFilter<"CreditCardPurchase"> | number;
    createdAt?: Prisma.DateTimeFilter<"CreditCardPurchase"> | Date | string;
    card?: Prisma.XOR<Prisma.CreditCardScalarRelationFilter, Prisma.CreditCardWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    category?: Prisma.XOR<Prisma.CategoryNullableScalarRelationFilter, Prisma.CategoryWhereInput> | null;
    installments?: Prisma.CreditCardInstallmentListRelationFilter;
}, "id">;
export type CreditCardPurchaseOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CreditCardPurchaseCountOrderByAggregateInput;
    _avg?: Prisma.CreditCardPurchaseAvgOrderByAggregateInput;
    _max?: Prisma.CreditCardPurchaseMaxOrderByAggregateInput;
    _min?: Prisma.CreditCardPurchaseMinOrderByAggregateInput;
    _sum?: Prisma.CreditCardPurchaseSumOrderByAggregateInput;
};
export type CreditCardPurchaseScalarWhereWithAggregatesInput = {
    AND?: Prisma.CreditCardPurchaseScalarWhereWithAggregatesInput | Prisma.CreditCardPurchaseScalarWhereWithAggregatesInput[];
    OR?: Prisma.CreditCardPurchaseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CreditCardPurchaseScalarWhereWithAggregatesInput | Prisma.CreditCardPurchaseScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CreditCardPurchase"> | string;
    cardId?: Prisma.UuidWithAggregatesFilter<"CreditCardPurchase"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CreditCardPurchase"> | string;
    categoryId?: Prisma.StringNullableWithAggregatesFilter<"CreditCardPurchase"> | string | null;
    description?: Prisma.StringWithAggregatesFilter<"CreditCardPurchase"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"CreditCardPurchase"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeWithAggregatesFilter<"CreditCardPurchase"> | Date | string;
    installmentCount?: Prisma.IntWithAggregatesFilter<"CreditCardPurchase"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardPurchase"> | Date | string;
};
export type CreditCardPurchaseCreateInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutPurchasesInput;
    user: Prisma.UserCreateNestedOneWithoutPurchasesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutPurchasesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseUncheckedCreateInput = {
    id?: string;
    cardId: string;
    userId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutPurchasesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPurchasesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutPurchasesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseCreateManyInput = {
    id?: string;
    cardId: string;
    userId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
};
export type CreditCardPurchaseUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardPurchaseUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardPurchaseListRelationFilter = {
    every?: Prisma.CreditCardPurchaseWhereInput;
    some?: Prisma.CreditCardPurchaseWhereInput;
    none?: Prisma.CreditCardPurchaseWhereInput;
};
export type CreditCardPurchaseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CreditCardPurchaseCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CreditCardPurchaseAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
};
export type CreditCardPurchaseMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CreditCardPurchaseMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    purchaseDate?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CreditCardPurchaseSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    installmentCount?: Prisma.SortOrder;
};
export type CreditCardPurchaseScalarRelationFilter = {
    is?: Prisma.CreditCardPurchaseWhereInput;
    isNot?: Prisma.CreditCardPurchaseWhereInput;
};
export type CreditCardPurchaseCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput> | Prisma.CreditCardPurchaseCreateWithoutUserInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
};
export type CreditCardPurchaseUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput> | Prisma.CreditCardPurchaseCreateWithoutUserInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
};
export type CreditCardPurchaseUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput> | Prisma.CreditCardPurchaseCreateWithoutUserInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    disconnect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    delete?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    update?: Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
};
export type CreditCardPurchaseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput> | Prisma.CreditCardPurchaseCreateWithoutUserInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    disconnect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    delete?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    update?: Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
};
export type CreditCardPurchaseCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput> | Prisma.CreditCardPurchaseCreateWithoutCategoryInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCategoryInputEnvelope;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
};
export type CreditCardPurchaseUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput> | Prisma.CreditCardPurchaseCreateWithoutCategoryInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCategoryInputEnvelope;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
};
export type CreditCardPurchaseUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput> | Prisma.CreditCardPurchaseCreateWithoutCategoryInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCategoryInputEnvelope;
    set?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    disconnect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    delete?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    update?: Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCategoryInput | Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
};
export type CreditCardPurchaseUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput> | Prisma.CreditCardPurchaseCreateWithoutCategoryInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCategoryInput[];
    upsert?: Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCategoryInput | Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCategoryInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCategoryInputEnvelope;
    set?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    disconnect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    delete?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    update?: Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCategoryInput | Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCategoryInput[];
    updateMany?: Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCategoryInput | Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCategoryInput[];
    deleteMany?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
};
export type CreditCardPurchaseCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput> | Prisma.CreditCardPurchaseCreateWithoutCardInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCardInputEnvelope;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
};
export type CreditCardPurchaseUncheckedCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput> | Prisma.CreditCardPurchaseCreateWithoutCardInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCardInputEnvelope;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
};
export type CreditCardPurchaseUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput> | Prisma.CreditCardPurchaseCreateWithoutCardInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCardInput | Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCardInputEnvelope;
    set?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    disconnect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    delete?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    update?: Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCardInput | Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCardInput | Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
};
export type CreditCardPurchaseUncheckedUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput> | Prisma.CreditCardPurchaseCreateWithoutCardInput[] | Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput | Prisma.CreditCardPurchaseCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCardInput | Prisma.CreditCardPurchaseUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CreditCardPurchaseCreateManyCardInputEnvelope;
    set?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    disconnect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    delete?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput | Prisma.CreditCardPurchaseWhereUniqueInput[];
    update?: Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCardInput | Prisma.CreditCardPurchaseUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCardInput | Prisma.CreditCardPurchaseUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
};
export type CreditCardPurchaseCreateNestedOneWithoutInstallmentsInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutInstallmentsInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutInstallmentsInput>;
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutInstallmentsInput;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput;
};
export type CreditCardPurchaseUpdateOneRequiredWithoutInstallmentsNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutInstallmentsInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutInstallmentsInput>;
    connectOrCreate?: Prisma.CreditCardPurchaseCreateOrConnectWithoutInstallmentsInput;
    upsert?: Prisma.CreditCardPurchaseUpsertWithoutInstallmentsInput;
    connect?: Prisma.CreditCardPurchaseWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CreditCardPurchaseUpdateToOneWithWhereWithoutInstallmentsInput, Prisma.CreditCardPurchaseUpdateWithoutInstallmentsInput>, Prisma.CreditCardPurchaseUncheckedUpdateWithoutInstallmentsInput>;
};
export type CreditCardPurchaseCreateWithoutUserInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutPurchasesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutPurchasesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseUncheckedCreateWithoutUserInput = {
    id?: string;
    cardId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseCreateOrConnectWithoutUserInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput>;
};
export type CreditCardPurchaseCreateManyUserInputEnvelope = {
    data: Prisma.CreditCardPurchaseCreateManyUserInput | Prisma.CreditCardPurchaseCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CreditCardPurchaseUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutUserInput>;
};
export type CreditCardPurchaseUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutUserInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutUserInput>;
};
export type CreditCardPurchaseUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CreditCardPurchaseScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateManyMutationInput, Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutUserInput>;
};
export type CreditCardPurchaseScalarWhereInput = {
    AND?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
    OR?: Prisma.CreditCardPurchaseScalarWhereInput[];
    NOT?: Prisma.CreditCardPurchaseScalarWhereInput | Prisma.CreditCardPurchaseScalarWhereInput[];
    id?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    userId?: Prisma.UuidFilter<"CreditCardPurchase"> | string;
    categoryId?: Prisma.StringNullableFilter<"CreditCardPurchase"> | string | null;
    description?: Prisma.StringFilter<"CreditCardPurchase"> | string;
    amount?: Prisma.DecimalFilter<"CreditCardPurchase"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFilter<"CreditCardPurchase"> | Date | string;
    installmentCount?: Prisma.IntFilter<"CreditCardPurchase"> | number;
    createdAt?: Prisma.DateTimeFilter<"CreditCardPurchase"> | Date | string;
};
export type CreditCardPurchaseCreateWithoutCategoryInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutPurchasesInput;
    user: Prisma.UserCreateNestedOneWithoutPurchasesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseUncheckedCreateWithoutCategoryInput = {
    id?: string;
    cardId: string;
    userId: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseCreateOrConnectWithoutCategoryInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput>;
};
export type CreditCardPurchaseCreateManyCategoryInputEnvelope = {
    data: Prisma.CreditCardPurchaseCreateManyCategoryInput | Prisma.CreditCardPurchaseCreateManyCategoryInput[];
    skipDuplicates?: boolean;
};
export type CreditCardPurchaseUpsertWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutCategoryInput>;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCategoryInput>;
};
export type CreditCardPurchaseUpdateWithWhereUniqueWithoutCategoryInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutCategoryInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutCategoryInput>;
};
export type CreditCardPurchaseUpdateManyWithWhereWithoutCategoryInput = {
    where: Prisma.CreditCardPurchaseScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateManyMutationInput, Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutCategoryInput>;
};
export type CreditCardPurchaseCreateWithoutCardInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPurchasesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutPurchasesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseUncheckedCreateWithoutCardInput = {
    id?: string;
    userId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutPurchaseInput;
};
export type CreditCardPurchaseCreateOrConnectWithoutCardInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput>;
};
export type CreditCardPurchaseCreateManyCardInputEnvelope = {
    data: Prisma.CreditCardPurchaseCreateManyCardInput | Prisma.CreditCardPurchaseCreateManyCardInput[];
    skipDuplicates?: boolean;
};
export type CreditCardPurchaseUpsertWithWhereUniqueWithoutCardInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutCardInput>;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutCardInput>;
};
export type CreditCardPurchaseUpdateWithWhereUniqueWithoutCardInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutCardInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutCardInput>;
};
export type CreditCardPurchaseUpdateManyWithWhereWithoutCardInput = {
    where: Prisma.CreditCardPurchaseScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateManyMutationInput, Prisma.CreditCardPurchaseUncheckedUpdateManyWithoutCardInput>;
};
export type CreditCardPurchaseCreateWithoutInstallmentsInput = {
    id?: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutPurchasesInput;
    user: Prisma.UserCreateNestedOneWithoutPurchasesInput;
    category?: Prisma.CategoryCreateNestedOneWithoutPurchasesInput;
};
export type CreditCardPurchaseUncheckedCreateWithoutInstallmentsInput = {
    id?: string;
    cardId: string;
    userId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
};
export type CreditCardPurchaseCreateOrConnectWithoutInstallmentsInput = {
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutInstallmentsInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutInstallmentsInput>;
};
export type CreditCardPurchaseUpsertWithoutInstallmentsInput = {
    update: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutInstallmentsInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutInstallmentsInput>;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateWithoutInstallmentsInput, Prisma.CreditCardPurchaseUncheckedCreateWithoutInstallmentsInput>;
    where?: Prisma.CreditCardPurchaseWhereInput;
};
export type CreditCardPurchaseUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: Prisma.CreditCardPurchaseWhereInput;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateWithoutInstallmentsInput, Prisma.CreditCardPurchaseUncheckedUpdateWithoutInstallmentsInput>;
};
export type CreditCardPurchaseUpdateWithoutInstallmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutPurchasesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPurchasesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutPurchasesNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateWithoutInstallmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardPurchaseCreateManyUserInput = {
    id?: string;
    cardId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
};
export type CreditCardPurchaseUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutPurchasesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutPurchasesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardPurchaseCreateManyCategoryInput = {
    id?: string;
    cardId: string;
    userId: string;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
};
export type CreditCardPurchaseUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutPurchasesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPurchasesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateManyWithoutCategoryInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardPurchaseCreateManyCardInput = {
    id?: string;
    userId: string;
    categoryId?: string | null;
    description: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Date | string;
    installmentCount?: number;
    createdAt?: Date | string;
};
export type CreditCardPurchaseUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPurchasesNestedInput;
    category?: Prisma.CategoryUpdateOneWithoutPurchasesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutPurchaseNestedInput;
};
export type CreditCardPurchaseUncheckedUpdateManyWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchaseDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installmentCount?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardPurchaseCountOutputType = {
    installments: number;
};
export type CreditCardPurchaseCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    installments?: boolean | CreditCardPurchaseCountOutputTypeCountInstallmentsArgs;
};
export type CreditCardPurchaseCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseCountOutputTypeSelect<ExtArgs> | null;
};
export type CreditCardPurchaseCountOutputTypeCountInstallmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInstallmentWhereInput;
};
export type CreditCardPurchaseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    purchaseDate?: boolean;
    installmentCount?: boolean;
    createdAt?: boolean;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CreditCardPurchase$categoryArgs<ExtArgs>;
    installments?: boolean | Prisma.CreditCardPurchase$installmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CreditCardPurchaseCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardPurchase"]>;
export type CreditCardPurchaseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    purchaseDate?: boolean;
    installmentCount?: boolean;
    createdAt?: boolean;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CreditCardPurchase$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardPurchase"]>;
export type CreditCardPurchaseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    purchaseDate?: boolean;
    installmentCount?: boolean;
    createdAt?: boolean;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CreditCardPurchase$categoryArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardPurchase"]>;
export type CreditCardPurchaseSelectScalar = {
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    categoryId?: boolean;
    description?: boolean;
    amount?: boolean;
    purchaseDate?: boolean;
    installmentCount?: boolean;
    createdAt?: boolean;
};
export type CreditCardPurchaseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "cardId" | "userId" | "categoryId" | "description" | "amount" | "purchaseDate" | "installmentCount" | "createdAt", ExtArgs["result"]["creditCardPurchase"]>;
export type CreditCardPurchaseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CreditCardPurchase$categoryArgs<ExtArgs>;
    installments?: boolean | Prisma.CreditCardPurchase$installmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CreditCardPurchaseCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CreditCardPurchaseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CreditCardPurchase$categoryArgs<ExtArgs>;
};
export type CreditCardPurchaseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    category?: boolean | Prisma.CreditCardPurchase$categoryArgs<ExtArgs>;
};
export type $CreditCardPurchasePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CreditCardPurchase";
    objects: {
        card: Prisma.$CreditCardPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        category: Prisma.$CategoryPayload<ExtArgs> | null;
        installments: Prisma.$CreditCardInstallmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        cardId: string;
        userId: string;
        categoryId: string | null;
        description: string;
        amount: runtime.Decimal;
        purchaseDate: Date;
        installmentCount: number;
        createdAt: Date;
    }, ExtArgs["result"]["creditCardPurchase"]>;
    composites: {};
};
export type CreditCardPurchaseGetPayload<S extends boolean | null | undefined | CreditCardPurchaseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload, S>;
export type CreditCardPurchaseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CreditCardPurchaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CreditCardPurchaseCountAggregateInputType | true;
};
export interface CreditCardPurchaseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CreditCardPurchase'];
        meta: {
            name: 'CreditCardPurchase';
        };
    };
    findUnique<T extends CreditCardPurchaseFindUniqueArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CreditCardPurchaseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CreditCardPurchaseFindFirstArgs>(args?: Prisma.SelectSubset<T, CreditCardPurchaseFindFirstArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CreditCardPurchaseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CreditCardPurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CreditCardPurchaseFindManyArgs>(args?: Prisma.SelectSubset<T, CreditCardPurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CreditCardPurchaseCreateArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseCreateArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CreditCardPurchaseCreateManyArgs>(args?: Prisma.SelectSubset<T, CreditCardPurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CreditCardPurchaseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CreditCardPurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CreditCardPurchaseDeleteArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseDeleteArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CreditCardPurchaseUpdateArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseUpdateArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CreditCardPurchaseDeleteManyArgs>(args?: Prisma.SelectSubset<T, CreditCardPurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CreditCardPurchaseUpdateManyArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CreditCardPurchaseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CreditCardPurchaseUpsertArgs>(args: Prisma.SelectSubset<T, CreditCardPurchaseUpsertArgs<ExtArgs>>): Prisma.Prisma__CreditCardPurchaseClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPurchasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CreditCardPurchaseCountArgs>(args?: Prisma.Subset<T, CreditCardPurchaseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CreditCardPurchaseCountAggregateOutputType> : number>;
    aggregate<T extends CreditCardPurchaseAggregateArgs>(args: Prisma.Subset<T, CreditCardPurchaseAggregateArgs>): Prisma.PrismaPromise<GetCreditCardPurchaseAggregateType<T>>;
    groupBy<T extends CreditCardPurchaseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CreditCardPurchaseGroupByArgs['orderBy'];
    } : {
        orderBy?: CreditCardPurchaseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CreditCardPurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditCardPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CreditCardPurchaseFieldRefs;
}
export interface Prisma__CreditCardPurchaseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    card<T extends Prisma.CreditCardDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardDefaultArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    category<T extends Prisma.CreditCardPurchase$categoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardPurchase$categoryArgs<ExtArgs>>): Prisma.Prisma__CategoryClient<runtime.Types.Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    installments<T extends Prisma.CreditCardPurchase$installmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardPurchase$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CreditCardPurchaseFieldRefs {
    readonly id: Prisma.FieldRef<"CreditCardPurchase", 'String'>;
    readonly cardId: Prisma.FieldRef<"CreditCardPurchase", 'String'>;
    readonly userId: Prisma.FieldRef<"CreditCardPurchase", 'String'>;
    readonly categoryId: Prisma.FieldRef<"CreditCardPurchase", 'String'>;
    readonly description: Prisma.FieldRef<"CreditCardPurchase", 'String'>;
    readonly amount: Prisma.FieldRef<"CreditCardPurchase", 'Decimal'>;
    readonly purchaseDate: Prisma.FieldRef<"CreditCardPurchase", 'DateTime'>;
    readonly installmentCount: Prisma.FieldRef<"CreditCardPurchase", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"CreditCardPurchase", 'DateTime'>;
}
export type CreditCardPurchaseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
};
export type CreditCardPurchaseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
};
export type CreditCardPurchaseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardPurchaseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardPurchaseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardPurchaseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardPurchaseCreateInput, Prisma.CreditCardPurchaseUncheckedCreateInput>;
};
export type CreditCardPurchaseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CreditCardPurchaseCreateManyInput | Prisma.CreditCardPurchaseCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CreditCardPurchaseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    data: Prisma.CreditCardPurchaseCreateManyInput | Prisma.CreditCardPurchaseCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CreditCardPurchaseIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CreditCardPurchaseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateInput, Prisma.CreditCardPurchaseUncheckedUpdateInput>;
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
};
export type CreditCardPurchaseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateManyMutationInput, Prisma.CreditCardPurchaseUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardPurchaseWhereInput;
    limit?: number;
};
export type CreditCardPurchaseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardPurchaseUpdateManyMutationInput, Prisma.CreditCardPurchaseUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardPurchaseWhereInput;
    limit?: number;
    include?: Prisma.CreditCardPurchaseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CreditCardPurchaseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardPurchaseCreateInput, Prisma.CreditCardPurchaseUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CreditCardPurchaseUpdateInput, Prisma.CreditCardPurchaseUncheckedUpdateInput>;
};
export type CreditCardPurchaseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
    where: Prisma.CreditCardPurchaseWhereUniqueInput;
};
export type CreditCardPurchaseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardPurchaseWhereInput;
    limit?: number;
};
export type CreditCardPurchase$categoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CategorySelect<ExtArgs> | null;
    omit?: Prisma.CategoryOmit<ExtArgs> | null;
    include?: Prisma.CategoryInclude<ExtArgs> | null;
    where?: Prisma.CategoryWhereInput;
};
export type CreditCardPurchase$installmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardPurchaseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardPurchaseSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardPurchaseOmit<ExtArgs> | null;
    include?: Prisma.CreditCardPurchaseInclude<ExtArgs> | null;
};
