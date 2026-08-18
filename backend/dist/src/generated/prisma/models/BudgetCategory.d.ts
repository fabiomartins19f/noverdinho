import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type BudgetCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$BudgetCategoryPayload>;
export type AggregateBudgetCategory = {
    _count: BudgetCategoryCountAggregateOutputType | null;
    _avg: BudgetCategoryAvgAggregateOutputType | null;
    _sum: BudgetCategorySumAggregateOutputType | null;
    _min: BudgetCategoryMinAggregateOutputType | null;
    _max: BudgetCategoryMaxAggregateOutputType | null;
};
export type BudgetCategoryAvgAggregateOutputType = {
    limit: runtime.Decimal | null;
    spent: runtime.Decimal | null;
};
export type BudgetCategorySumAggregateOutputType = {
    limit: runtime.Decimal | null;
    spent: runtime.Decimal | null;
};
export type BudgetCategoryMinAggregateOutputType = {
    id: string | null;
    budgetId: string | null;
    categoryId: string | null;
    name: string | null;
    limit: runtime.Decimal | null;
    spent: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BudgetCategoryMaxAggregateOutputType = {
    id: string | null;
    budgetId: string | null;
    categoryId: string | null;
    name: string | null;
    limit: runtime.Decimal | null;
    spent: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BudgetCategoryCountAggregateOutputType = {
    id: number;
    budgetId: number;
    categoryId: number;
    name: number;
    limit: number;
    spent: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BudgetCategoryAvgAggregateInputType = {
    limit?: true;
    spent?: true;
};
export type BudgetCategorySumAggregateInputType = {
    limit?: true;
    spent?: true;
};
export type BudgetCategoryMinAggregateInputType = {
    id?: true;
    budgetId?: true;
    categoryId?: true;
    name?: true;
    limit?: true;
    spent?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BudgetCategoryMaxAggregateInputType = {
    id?: true;
    budgetId?: true;
    categoryId?: true;
    name?: true;
    limit?: true;
    spent?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BudgetCategoryCountAggregateInputType = {
    id?: true;
    budgetId?: true;
    categoryId?: true;
    name?: true;
    limit?: true;
    spent?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BudgetCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetCategoryWhereInput;
    orderBy?: Prisma.BudgetCategoryOrderByWithRelationInput | Prisma.BudgetCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BudgetCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BudgetCategoryCountAggregateInputType;
    _avg?: BudgetCategoryAvgAggregateInputType;
    _sum?: BudgetCategorySumAggregateInputType;
    _min?: BudgetCategoryMinAggregateInputType;
    _max?: BudgetCategoryMaxAggregateInputType;
};
export type GetBudgetCategoryAggregateType<T extends BudgetCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregateBudgetCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBudgetCategory[P]> : Prisma.GetScalarType<T[P], AggregateBudgetCategory[P]>;
};
export type BudgetCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetCategoryWhereInput;
    orderBy?: Prisma.BudgetCategoryOrderByWithAggregationInput | Prisma.BudgetCategoryOrderByWithAggregationInput[];
    by: Prisma.BudgetCategoryScalarFieldEnum[] | Prisma.BudgetCategoryScalarFieldEnum;
    having?: Prisma.BudgetCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BudgetCategoryCountAggregateInputType | true;
    _avg?: BudgetCategoryAvgAggregateInputType;
    _sum?: BudgetCategorySumAggregateInputType;
    _min?: BudgetCategoryMinAggregateInputType;
    _max?: BudgetCategoryMaxAggregateInputType;
};
export type BudgetCategoryGroupByOutputType = {
    id: string;
    budgetId: string;
    categoryId: string | null;
    name: string;
    limit: runtime.Decimal;
    spent: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: BudgetCategoryCountAggregateOutputType | null;
    _avg: BudgetCategoryAvgAggregateOutputType | null;
    _sum: BudgetCategorySumAggregateOutputType | null;
    _min: BudgetCategoryMinAggregateOutputType | null;
    _max: BudgetCategoryMaxAggregateOutputType | null;
};
export type GetBudgetCategoryGroupByPayload<T extends BudgetCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BudgetCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BudgetCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BudgetCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BudgetCategoryGroupByOutputType[P]>;
}>>;
export type BudgetCategoryWhereInput = {
    AND?: Prisma.BudgetCategoryWhereInput | Prisma.BudgetCategoryWhereInput[];
    OR?: Prisma.BudgetCategoryWhereInput[];
    NOT?: Prisma.BudgetCategoryWhereInput | Prisma.BudgetCategoryWhereInput[];
    id?: Prisma.UuidFilter<"BudgetCategory"> | string;
    budgetId?: Prisma.UuidFilter<"BudgetCategory"> | string;
    categoryId?: Prisma.UuidNullableFilter<"BudgetCategory"> | string | null;
    name?: Prisma.StringFilter<"BudgetCategory"> | string;
    limit?: Prisma.DecimalFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"BudgetCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BudgetCategory"> | Date | string;
    budget?: Prisma.XOR<Prisma.BudgetScalarRelationFilter, Prisma.BudgetWhereInput>;
};
export type BudgetCategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    budgetId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    budget?: Prisma.BudgetOrderByWithRelationInput;
};
export type BudgetCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BudgetCategoryWhereInput | Prisma.BudgetCategoryWhereInput[];
    OR?: Prisma.BudgetCategoryWhereInput[];
    NOT?: Prisma.BudgetCategoryWhereInput | Prisma.BudgetCategoryWhereInput[];
    budgetId?: Prisma.UuidFilter<"BudgetCategory"> | string;
    categoryId?: Prisma.UuidNullableFilter<"BudgetCategory"> | string | null;
    name?: Prisma.StringFilter<"BudgetCategory"> | string;
    limit?: Prisma.DecimalFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"BudgetCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BudgetCategory"> | Date | string;
    budget?: Prisma.XOR<Prisma.BudgetScalarRelationFilter, Prisma.BudgetWhereInput>;
}, "id">;
export type BudgetCategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    budgetId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BudgetCategoryCountOrderByAggregateInput;
    _avg?: Prisma.BudgetCategoryAvgOrderByAggregateInput;
    _max?: Prisma.BudgetCategoryMaxOrderByAggregateInput;
    _min?: Prisma.BudgetCategoryMinOrderByAggregateInput;
    _sum?: Prisma.BudgetCategorySumOrderByAggregateInput;
};
export type BudgetCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.BudgetCategoryScalarWhereWithAggregatesInput | Prisma.BudgetCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.BudgetCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BudgetCategoryScalarWhereWithAggregatesInput | Prisma.BudgetCategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"BudgetCategory"> | string;
    budgetId?: Prisma.UuidWithAggregatesFilter<"BudgetCategory"> | string;
    categoryId?: Prisma.UuidNullableWithAggregatesFilter<"BudgetCategory"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"BudgetCategory"> | string;
    limit?: Prisma.DecimalWithAggregatesFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalWithAggregatesFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BudgetCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"BudgetCategory"> | Date | string;
};
export type BudgetCategoryCreateInput = {
    id?: string;
    categoryId?: string | null;
    name: string;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    budget: Prisma.BudgetCreateNestedOneWithoutCategoriesInput;
};
export type BudgetCategoryUncheckedCreateInput = {
    id?: string;
    budgetId: string;
    categoryId?: string | null;
    name: string;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetCategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    budget?: Prisma.BudgetUpdateOneRequiredWithoutCategoriesNestedInput;
};
export type BudgetCategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    budgetId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetCategoryCreateManyInput = {
    id?: string;
    budgetId: string;
    categoryId?: string | null;
    name: string;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetCategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetCategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    budgetId?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetCategoryListRelationFilter = {
    every?: Prisma.BudgetCategoryWhereInput;
    some?: Prisma.BudgetCategoryWhereInput;
    none?: Prisma.BudgetCategoryWhereInput;
};
export type BudgetCategoryOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BudgetCategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    budgetId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BudgetCategoryAvgOrderByAggregateInput = {
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
};
export type BudgetCategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    budgetId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BudgetCategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    budgetId?: Prisma.SortOrder;
    categoryId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BudgetCategorySumOrderByAggregateInput = {
    limit?: Prisma.SortOrder;
    spent?: Prisma.SortOrder;
};
export type BudgetCategoryCreateNestedManyWithoutBudgetInput = {
    create?: Prisma.XOR<Prisma.BudgetCategoryCreateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput> | Prisma.BudgetCategoryCreateWithoutBudgetInput[] | Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput[];
    connectOrCreate?: Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput | Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput[];
    createMany?: Prisma.BudgetCategoryCreateManyBudgetInputEnvelope;
    connect?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
};
export type BudgetCategoryUncheckedCreateNestedManyWithoutBudgetInput = {
    create?: Prisma.XOR<Prisma.BudgetCategoryCreateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput> | Prisma.BudgetCategoryCreateWithoutBudgetInput[] | Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput[];
    connectOrCreate?: Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput | Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput[];
    createMany?: Prisma.BudgetCategoryCreateManyBudgetInputEnvelope;
    connect?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
};
export type BudgetCategoryUpdateManyWithoutBudgetNestedInput = {
    create?: Prisma.XOR<Prisma.BudgetCategoryCreateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput> | Prisma.BudgetCategoryCreateWithoutBudgetInput[] | Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput[];
    connectOrCreate?: Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput | Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput[];
    upsert?: Prisma.BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput | Prisma.BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput[];
    createMany?: Prisma.BudgetCategoryCreateManyBudgetInputEnvelope;
    set?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    disconnect?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    delete?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    connect?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    update?: Prisma.BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput | Prisma.BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput[];
    updateMany?: Prisma.BudgetCategoryUpdateManyWithWhereWithoutBudgetInput | Prisma.BudgetCategoryUpdateManyWithWhereWithoutBudgetInput[];
    deleteMany?: Prisma.BudgetCategoryScalarWhereInput | Prisma.BudgetCategoryScalarWhereInput[];
};
export type BudgetCategoryUncheckedUpdateManyWithoutBudgetNestedInput = {
    create?: Prisma.XOR<Prisma.BudgetCategoryCreateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput> | Prisma.BudgetCategoryCreateWithoutBudgetInput[] | Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput[];
    connectOrCreate?: Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput | Prisma.BudgetCategoryCreateOrConnectWithoutBudgetInput[];
    upsert?: Prisma.BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput | Prisma.BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput[];
    createMany?: Prisma.BudgetCategoryCreateManyBudgetInputEnvelope;
    set?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    disconnect?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    delete?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    connect?: Prisma.BudgetCategoryWhereUniqueInput | Prisma.BudgetCategoryWhereUniqueInput[];
    update?: Prisma.BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput | Prisma.BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput[];
    updateMany?: Prisma.BudgetCategoryUpdateManyWithWhereWithoutBudgetInput | Prisma.BudgetCategoryUpdateManyWithWhereWithoutBudgetInput[];
    deleteMany?: Prisma.BudgetCategoryScalarWhereInput | Prisma.BudgetCategoryScalarWhereInput[];
};
export type BudgetCategoryCreateWithoutBudgetInput = {
    id?: string;
    categoryId?: string | null;
    name: string;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetCategoryUncheckedCreateWithoutBudgetInput = {
    id?: string;
    categoryId?: string | null;
    name: string;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetCategoryCreateOrConnectWithoutBudgetInput = {
    where: Prisma.BudgetCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BudgetCategoryCreateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput>;
};
export type BudgetCategoryCreateManyBudgetInputEnvelope = {
    data: Prisma.BudgetCategoryCreateManyBudgetInput | Prisma.BudgetCategoryCreateManyBudgetInput[];
    skipDuplicates?: boolean;
};
export type BudgetCategoryUpsertWithWhereUniqueWithoutBudgetInput = {
    where: Prisma.BudgetCategoryWhereUniqueInput;
    update: Prisma.XOR<Prisma.BudgetCategoryUpdateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedUpdateWithoutBudgetInput>;
    create: Prisma.XOR<Prisma.BudgetCategoryCreateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedCreateWithoutBudgetInput>;
};
export type BudgetCategoryUpdateWithWhereUniqueWithoutBudgetInput = {
    where: Prisma.BudgetCategoryWhereUniqueInput;
    data: Prisma.XOR<Prisma.BudgetCategoryUpdateWithoutBudgetInput, Prisma.BudgetCategoryUncheckedUpdateWithoutBudgetInput>;
};
export type BudgetCategoryUpdateManyWithWhereWithoutBudgetInput = {
    where: Prisma.BudgetCategoryScalarWhereInput;
    data: Prisma.XOR<Prisma.BudgetCategoryUpdateManyMutationInput, Prisma.BudgetCategoryUncheckedUpdateManyWithoutBudgetInput>;
};
export type BudgetCategoryScalarWhereInput = {
    AND?: Prisma.BudgetCategoryScalarWhereInput | Prisma.BudgetCategoryScalarWhereInput[];
    OR?: Prisma.BudgetCategoryScalarWhereInput[];
    NOT?: Prisma.BudgetCategoryScalarWhereInput | Prisma.BudgetCategoryScalarWhereInput[];
    id?: Prisma.UuidFilter<"BudgetCategory"> | string;
    budgetId?: Prisma.UuidFilter<"BudgetCategory"> | string;
    categoryId?: Prisma.UuidNullableFilter<"BudgetCategory"> | string | null;
    name?: Prisma.StringFilter<"BudgetCategory"> | string;
    limit?: Prisma.DecimalFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFilter<"BudgetCategory"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"BudgetCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"BudgetCategory"> | Date | string;
};
export type BudgetCategoryCreateManyBudgetInput = {
    id?: string;
    categoryId?: string | null;
    name: string;
    limit: runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BudgetCategoryUpdateWithoutBudgetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetCategoryUncheckedUpdateWithoutBudgetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetCategoryUncheckedUpdateManyWithoutBudgetInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    categoryId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    limit?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    spent?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BudgetCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    budgetId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    limit?: boolean;
    spent?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    budget?: boolean | Prisma.BudgetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgetCategory"]>;
export type BudgetCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    budgetId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    limit?: boolean;
    spent?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    budget?: boolean | Prisma.BudgetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgetCategory"]>;
export type BudgetCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    budgetId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    limit?: boolean;
    spent?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    budget?: boolean | Prisma.BudgetDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["budgetCategory"]>;
export type BudgetCategorySelectScalar = {
    id?: boolean;
    budgetId?: boolean;
    categoryId?: boolean;
    name?: boolean;
    limit?: boolean;
    spent?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BudgetCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "budgetId" | "categoryId" | "name" | "limit" | "spent" | "createdAt" | "updatedAt", ExtArgs["result"]["budgetCategory"]>;
export type BudgetCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budget?: boolean | Prisma.BudgetDefaultArgs<ExtArgs>;
};
export type BudgetCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budget?: boolean | Prisma.BudgetDefaultArgs<ExtArgs>;
};
export type BudgetCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    budget?: boolean | Prisma.BudgetDefaultArgs<ExtArgs>;
};
export type $BudgetCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BudgetCategory";
    objects: {
        budget: Prisma.$BudgetPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        budgetId: string;
        categoryId: string | null;
        name: string;
        limit: runtime.Decimal;
        spent: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["budgetCategory"]>;
    composites: {};
};
export type BudgetCategoryGetPayload<S extends boolean | null | undefined | BudgetCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload, S>;
export type BudgetCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BudgetCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BudgetCategoryCountAggregateInputType | true;
};
export interface BudgetCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BudgetCategory'];
        meta: {
            name: 'BudgetCategory';
        };
    };
    findUnique<T extends BudgetCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, BudgetCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BudgetCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BudgetCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BudgetCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, BudgetCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BudgetCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BudgetCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BudgetCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, BudgetCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BudgetCategoryCreateArgs>(args: Prisma.SelectSubset<T, BudgetCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BudgetCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, BudgetCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BudgetCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BudgetCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BudgetCategoryDeleteArgs>(args: Prisma.SelectSubset<T, BudgetCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BudgetCategoryUpdateArgs>(args: Prisma.SelectSubset<T, BudgetCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BudgetCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, BudgetCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BudgetCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, BudgetCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BudgetCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BudgetCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BudgetCategoryUpsertArgs>(args: Prisma.SelectSubset<T, BudgetCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__BudgetCategoryClient<runtime.Types.Result.GetResult<Prisma.$BudgetCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BudgetCategoryCountArgs>(args?: Prisma.Subset<T, BudgetCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BudgetCategoryCountAggregateOutputType> : number>;
    aggregate<T extends BudgetCategoryAggregateArgs>(args: Prisma.Subset<T, BudgetCategoryAggregateArgs>): Prisma.PrismaPromise<GetBudgetCategoryAggregateType<T>>;
    groupBy<T extends BudgetCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BudgetCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: BudgetCategoryGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BudgetCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBudgetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BudgetCategoryFieldRefs;
}
export interface Prisma__BudgetCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    budget<T extends Prisma.BudgetDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BudgetDefaultArgs<ExtArgs>>): Prisma.Prisma__BudgetClient<runtime.Types.Result.GetResult<Prisma.$BudgetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BudgetCategoryFieldRefs {
    readonly id: Prisma.FieldRef<"BudgetCategory", 'String'>;
    readonly budgetId: Prisma.FieldRef<"BudgetCategory", 'String'>;
    readonly categoryId: Prisma.FieldRef<"BudgetCategory", 'String'>;
    readonly name: Prisma.FieldRef<"BudgetCategory", 'String'>;
    readonly limit: Prisma.FieldRef<"BudgetCategory", 'Decimal'>;
    readonly spent: Prisma.FieldRef<"BudgetCategory", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"BudgetCategory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"BudgetCategory", 'DateTime'>;
}
export type BudgetCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where: Prisma.BudgetCategoryWhereUniqueInput;
};
export type BudgetCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where: Prisma.BudgetCategoryWhereUniqueInput;
};
export type BudgetCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where?: Prisma.BudgetCategoryWhereInput;
    orderBy?: Prisma.BudgetCategoryOrderByWithRelationInput | Prisma.BudgetCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BudgetCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetCategoryScalarFieldEnum | Prisma.BudgetCategoryScalarFieldEnum[];
};
export type BudgetCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where?: Prisma.BudgetCategoryWhereInput;
    orderBy?: Prisma.BudgetCategoryOrderByWithRelationInput | Prisma.BudgetCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BudgetCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetCategoryScalarFieldEnum | Prisma.BudgetCategoryScalarFieldEnum[];
};
export type BudgetCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where?: Prisma.BudgetCategoryWhereInput;
    orderBy?: Prisma.BudgetCategoryOrderByWithRelationInput | Prisma.BudgetCategoryOrderByWithRelationInput[];
    cursor?: Prisma.BudgetCategoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BudgetCategoryScalarFieldEnum | Prisma.BudgetCategoryScalarFieldEnum[];
};
export type BudgetCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BudgetCategoryCreateInput, Prisma.BudgetCategoryUncheckedCreateInput>;
};
export type BudgetCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BudgetCategoryCreateManyInput | Prisma.BudgetCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BudgetCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    data: Prisma.BudgetCategoryCreateManyInput | Prisma.BudgetCategoryCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BudgetCategoryIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BudgetCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BudgetCategoryUpdateInput, Prisma.BudgetCategoryUncheckedUpdateInput>;
    where: Prisma.BudgetCategoryWhereUniqueInput;
};
export type BudgetCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BudgetCategoryUpdateManyMutationInput, Prisma.BudgetCategoryUncheckedUpdateManyInput>;
    where?: Prisma.BudgetCategoryWhereInput;
    limit?: number;
};
export type BudgetCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BudgetCategoryUpdateManyMutationInput, Prisma.BudgetCategoryUncheckedUpdateManyInput>;
    where?: Prisma.BudgetCategoryWhereInput;
    limit?: number;
    include?: Prisma.BudgetCategoryIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BudgetCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where: Prisma.BudgetCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.BudgetCategoryCreateInput, Prisma.BudgetCategoryUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BudgetCategoryUpdateInput, Prisma.BudgetCategoryUncheckedUpdateInput>;
};
export type BudgetCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
    where: Prisma.BudgetCategoryWhereUniqueInput;
};
export type BudgetCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BudgetCategoryWhereInput;
    limit?: number;
};
export type BudgetCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BudgetCategorySelect<ExtArgs> | null;
    omit?: Prisma.BudgetCategoryOmit<ExtArgs> | null;
    include?: Prisma.BudgetCategoryInclude<ExtArgs> | null;
};
