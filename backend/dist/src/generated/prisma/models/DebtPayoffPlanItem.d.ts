import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type DebtPayoffPlanItemModel = runtime.Types.Result.DefaultSelection<Prisma.$DebtPayoffPlanItemPayload>;
export type AggregateDebtPayoffPlanItem = {
    _count: DebtPayoffPlanItemCountAggregateOutputType | null;
    _avg: DebtPayoffPlanItemAvgAggregateOutputType | null;
    _sum: DebtPayoffPlanItemSumAggregateOutputType | null;
    _min: DebtPayoffPlanItemMinAggregateOutputType | null;
    _max: DebtPayoffPlanItemMaxAggregateOutputType | null;
};
export type DebtPayoffPlanItemAvgAggregateOutputType = {
    order: number | null;
    payoffMonth: number | null;
    amountPerMonth: runtime.Decimal | null;
};
export type DebtPayoffPlanItemSumAggregateOutputType = {
    order: number | null;
    payoffMonth: number | null;
    amountPerMonth: runtime.Decimal | null;
};
export type DebtPayoffPlanItemMinAggregateOutputType = {
    id: string | null;
    planId: string | null;
    debtId: string | null;
    order: number | null;
    payoffMonth: number | null;
    projectedPayoffDate: Date | null;
    amountPerMonth: runtime.Decimal | null;
};
export type DebtPayoffPlanItemMaxAggregateOutputType = {
    id: string | null;
    planId: string | null;
    debtId: string | null;
    order: number | null;
    payoffMonth: number | null;
    projectedPayoffDate: Date | null;
    amountPerMonth: runtime.Decimal | null;
};
export type DebtPayoffPlanItemCountAggregateOutputType = {
    id: number;
    planId: number;
    debtId: number;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: number;
    amountPerMonth: number;
    _all: number;
};
export type DebtPayoffPlanItemAvgAggregateInputType = {
    order?: true;
    payoffMonth?: true;
    amountPerMonth?: true;
};
export type DebtPayoffPlanItemSumAggregateInputType = {
    order?: true;
    payoffMonth?: true;
    amountPerMonth?: true;
};
export type DebtPayoffPlanItemMinAggregateInputType = {
    id?: true;
    planId?: true;
    debtId?: true;
    order?: true;
    payoffMonth?: true;
    projectedPayoffDate?: true;
    amountPerMonth?: true;
};
export type DebtPayoffPlanItemMaxAggregateInputType = {
    id?: true;
    planId?: true;
    debtId?: true;
    order?: true;
    payoffMonth?: true;
    projectedPayoffDate?: true;
    amountPerMonth?: true;
};
export type DebtPayoffPlanItemCountAggregateInputType = {
    id?: true;
    planId?: true;
    debtId?: true;
    order?: true;
    payoffMonth?: true;
    projectedPayoffDate?: true;
    amountPerMonth?: true;
    _all?: true;
};
export type DebtPayoffPlanItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    orderBy?: Prisma.DebtPayoffPlanItemOrderByWithRelationInput | Prisma.DebtPayoffPlanItemOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DebtPayoffPlanItemCountAggregateInputType;
    _avg?: DebtPayoffPlanItemAvgAggregateInputType;
    _sum?: DebtPayoffPlanItemSumAggregateInputType;
    _min?: DebtPayoffPlanItemMinAggregateInputType;
    _max?: DebtPayoffPlanItemMaxAggregateInputType;
};
export type GetDebtPayoffPlanItemAggregateType<T extends DebtPayoffPlanItemAggregateArgs> = {
    [P in keyof T & keyof AggregateDebtPayoffPlanItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDebtPayoffPlanItem[P]> : Prisma.GetScalarType<T[P], AggregateDebtPayoffPlanItem[P]>;
};
export type DebtPayoffPlanItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    orderBy?: Prisma.DebtPayoffPlanItemOrderByWithAggregationInput | Prisma.DebtPayoffPlanItemOrderByWithAggregationInput[];
    by: Prisma.DebtPayoffPlanItemScalarFieldEnum[] | Prisma.DebtPayoffPlanItemScalarFieldEnum;
    having?: Prisma.DebtPayoffPlanItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DebtPayoffPlanItemCountAggregateInputType | true;
    _avg?: DebtPayoffPlanItemAvgAggregateInputType;
    _sum?: DebtPayoffPlanItemSumAggregateInputType;
    _min?: DebtPayoffPlanItemMinAggregateInputType;
    _max?: DebtPayoffPlanItemMaxAggregateInputType;
};
export type DebtPayoffPlanItemGroupByOutputType = {
    id: string;
    planId: string;
    debtId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date;
    amountPerMonth: runtime.Decimal;
    _count: DebtPayoffPlanItemCountAggregateOutputType | null;
    _avg: DebtPayoffPlanItemAvgAggregateOutputType | null;
    _sum: DebtPayoffPlanItemSumAggregateOutputType | null;
    _min: DebtPayoffPlanItemMinAggregateOutputType | null;
    _max: DebtPayoffPlanItemMaxAggregateOutputType | null;
};
export type GetDebtPayoffPlanItemGroupByPayload<T extends DebtPayoffPlanItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DebtPayoffPlanItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DebtPayoffPlanItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DebtPayoffPlanItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DebtPayoffPlanItemGroupByOutputType[P]>;
}>>;
export type DebtPayoffPlanItemWhereInput = {
    AND?: Prisma.DebtPayoffPlanItemWhereInput | Prisma.DebtPayoffPlanItemWhereInput[];
    OR?: Prisma.DebtPayoffPlanItemWhereInput[];
    NOT?: Prisma.DebtPayoffPlanItemWhereInput | Prisma.DebtPayoffPlanItemWhereInput[];
    id?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    planId?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    debtId?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    order?: Prisma.IntFilter<"DebtPayoffPlanItem"> | number;
    payoffMonth?: Prisma.IntFilter<"DebtPayoffPlanItem"> | number;
    projectedPayoffDate?: Prisma.DateTimeFilter<"DebtPayoffPlanItem"> | Date | string;
    amountPerMonth?: Prisma.DecimalFilter<"DebtPayoffPlanItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    plan?: Prisma.XOR<Prisma.DebtPayoffPlanScalarRelationFilter, Prisma.DebtPayoffPlanWhereInput>;
    debt?: Prisma.XOR<Prisma.DebtScalarRelationFilter, Prisma.DebtWhereInput>;
};
export type DebtPayoffPlanItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
    plan?: Prisma.DebtPayoffPlanOrderByWithRelationInput;
    debt?: Prisma.DebtOrderByWithRelationInput;
};
export type DebtPayoffPlanItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DebtPayoffPlanItemWhereInput | Prisma.DebtPayoffPlanItemWhereInput[];
    OR?: Prisma.DebtPayoffPlanItemWhereInput[];
    NOT?: Prisma.DebtPayoffPlanItemWhereInput | Prisma.DebtPayoffPlanItemWhereInput[];
    planId?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    debtId?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    order?: Prisma.IntFilter<"DebtPayoffPlanItem"> | number;
    payoffMonth?: Prisma.IntFilter<"DebtPayoffPlanItem"> | number;
    projectedPayoffDate?: Prisma.DateTimeFilter<"DebtPayoffPlanItem"> | Date | string;
    amountPerMonth?: Prisma.DecimalFilter<"DebtPayoffPlanItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    plan?: Prisma.XOR<Prisma.DebtPayoffPlanScalarRelationFilter, Prisma.DebtPayoffPlanWhereInput>;
    debt?: Prisma.XOR<Prisma.DebtScalarRelationFilter, Prisma.DebtWhereInput>;
}, "id">;
export type DebtPayoffPlanItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
    _count?: Prisma.DebtPayoffPlanItemCountOrderByAggregateInput;
    _avg?: Prisma.DebtPayoffPlanItemAvgOrderByAggregateInput;
    _max?: Prisma.DebtPayoffPlanItemMaxOrderByAggregateInput;
    _min?: Prisma.DebtPayoffPlanItemMinOrderByAggregateInput;
    _sum?: Prisma.DebtPayoffPlanItemSumOrderByAggregateInput;
};
export type DebtPayoffPlanItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.DebtPayoffPlanItemScalarWhereWithAggregatesInput | Prisma.DebtPayoffPlanItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.DebtPayoffPlanItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DebtPayoffPlanItemScalarWhereWithAggregatesInput | Prisma.DebtPayoffPlanItemScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DebtPayoffPlanItem"> | string;
    planId?: Prisma.UuidWithAggregatesFilter<"DebtPayoffPlanItem"> | string;
    debtId?: Prisma.UuidWithAggregatesFilter<"DebtPayoffPlanItem"> | string;
    order?: Prisma.IntWithAggregatesFilter<"DebtPayoffPlanItem"> | number;
    payoffMonth?: Prisma.IntWithAggregatesFilter<"DebtPayoffPlanItem"> | number;
    projectedPayoffDate?: Prisma.DateTimeWithAggregatesFilter<"DebtPayoffPlanItem"> | Date | string;
    amountPerMonth?: Prisma.DecimalWithAggregatesFilter<"DebtPayoffPlanItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemCreateInput = {
    id?: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
    plan: Prisma.DebtPayoffPlanCreateNestedOneWithoutItemsInput;
    debt: Prisma.DebtCreateNestedOneWithoutPlanItemsInput;
};
export type DebtPayoffPlanItemUncheckedCreateInput = {
    id?: string;
    planId: string;
    debtId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    plan?: Prisma.DebtPayoffPlanUpdateOneRequiredWithoutItemsNestedInput;
    debt?: Prisma.DebtUpdateOneRequiredWithoutPlanItemsNestedInput;
};
export type DebtPayoffPlanItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemCreateManyInput = {
    id?: string;
    planId: string;
    debtId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemListRelationFilter = {
    every?: Prisma.DebtPayoffPlanItemWhereInput;
    some?: Prisma.DebtPayoffPlanItemWhereInput;
    none?: Prisma.DebtPayoffPlanItemWhereInput;
};
export type DebtPayoffPlanItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DebtPayoffPlanItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
};
export type DebtPayoffPlanItemAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
};
export type DebtPayoffPlanItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
};
export type DebtPayoffPlanItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
};
export type DebtPayoffPlanItemSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    payoffMonth?: Prisma.SortOrder;
    amountPerMonth?: Prisma.SortOrder;
};
export type DebtPayoffPlanItemCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput> | Prisma.DebtPayoffPlanItemCreateWithoutDebtInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyDebtInputEnvelope;
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
};
export type DebtPayoffPlanItemUncheckedCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput> | Prisma.DebtPayoffPlanItemCreateWithoutDebtInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyDebtInputEnvelope;
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
};
export type DebtPayoffPlanItemUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput> | Prisma.DebtPayoffPlanItemCreateWithoutDebtInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutDebtInput | Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyDebtInputEnvelope;
    set?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    disconnect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    delete?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    update?: Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutDebtInput | Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutDebtInput | Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.DebtPayoffPlanItemScalarWhereInput | Prisma.DebtPayoffPlanItemScalarWhereInput[];
};
export type DebtPayoffPlanItemUncheckedUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput> | Prisma.DebtPayoffPlanItemCreateWithoutDebtInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutDebtInput | Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyDebtInputEnvelope;
    set?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    disconnect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    delete?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    update?: Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutDebtInput | Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutDebtInput | Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.DebtPayoffPlanItemScalarWhereInput | Prisma.DebtPayoffPlanItemScalarWhereInput[];
};
export type DebtPayoffPlanItemCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput> | Prisma.DebtPayoffPlanItemCreateWithoutPlanInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyPlanInputEnvelope;
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
};
export type DebtPayoffPlanItemUncheckedCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput> | Prisma.DebtPayoffPlanItemCreateWithoutPlanInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyPlanInputEnvelope;
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
};
export type DebtPayoffPlanItemUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput> | Prisma.DebtPayoffPlanItemCreateWithoutPlanInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutPlanInput | Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyPlanInputEnvelope;
    set?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    disconnect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    delete?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    update?: Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutPlanInput | Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutPlanInput | Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.DebtPayoffPlanItemScalarWhereInput | Prisma.DebtPayoffPlanItemScalarWhereInput[];
};
export type DebtPayoffPlanItemUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput> | Prisma.DebtPayoffPlanItemCreateWithoutPlanInput[] | Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput | Prisma.DebtPayoffPlanItemCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutPlanInput | Prisma.DebtPayoffPlanItemUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.DebtPayoffPlanItemCreateManyPlanInputEnvelope;
    set?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    disconnect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    delete?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    connect?: Prisma.DebtPayoffPlanItemWhereUniqueInput | Prisma.DebtPayoffPlanItemWhereUniqueInput[];
    update?: Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutPlanInput | Prisma.DebtPayoffPlanItemUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutPlanInput | Prisma.DebtPayoffPlanItemUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.DebtPayoffPlanItemScalarWhereInput | Prisma.DebtPayoffPlanItemScalarWhereInput[];
};
export type DebtPayoffPlanItemCreateWithoutDebtInput = {
    id?: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
    plan: Prisma.DebtPayoffPlanCreateNestedOneWithoutItemsInput;
};
export type DebtPayoffPlanItemUncheckedCreateWithoutDebtInput = {
    id?: string;
    planId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemCreateOrConnectWithoutDebtInput = {
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput>;
};
export type DebtPayoffPlanItemCreateManyDebtInputEnvelope = {
    data: Prisma.DebtPayoffPlanItemCreateManyDebtInput | Prisma.DebtPayoffPlanItemCreateManyDebtInput[];
    skipDuplicates?: boolean;
};
export type DebtPayoffPlanItemUpsertWithWhereUniqueWithoutDebtInput = {
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedUpdateWithoutDebtInput>;
    create: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutDebtInput>;
};
export type DebtPayoffPlanItemUpdateWithWhereUniqueWithoutDebtInput = {
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateWithoutDebtInput, Prisma.DebtPayoffPlanItemUncheckedUpdateWithoutDebtInput>;
};
export type DebtPayoffPlanItemUpdateManyWithWhereWithoutDebtInput = {
    where: Prisma.DebtPayoffPlanItemScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateManyMutationInput, Prisma.DebtPayoffPlanItemUncheckedUpdateManyWithoutDebtInput>;
};
export type DebtPayoffPlanItemScalarWhereInput = {
    AND?: Prisma.DebtPayoffPlanItemScalarWhereInput | Prisma.DebtPayoffPlanItemScalarWhereInput[];
    OR?: Prisma.DebtPayoffPlanItemScalarWhereInput[];
    NOT?: Prisma.DebtPayoffPlanItemScalarWhereInput | Prisma.DebtPayoffPlanItemScalarWhereInput[];
    id?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    planId?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    debtId?: Prisma.UuidFilter<"DebtPayoffPlanItem"> | string;
    order?: Prisma.IntFilter<"DebtPayoffPlanItem"> | number;
    payoffMonth?: Prisma.IntFilter<"DebtPayoffPlanItem"> | number;
    projectedPayoffDate?: Prisma.DateTimeFilter<"DebtPayoffPlanItem"> | Date | string;
    amountPerMonth?: Prisma.DecimalFilter<"DebtPayoffPlanItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemCreateWithoutPlanInput = {
    id?: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
    debt: Prisma.DebtCreateNestedOneWithoutPlanItemsInput;
};
export type DebtPayoffPlanItemUncheckedCreateWithoutPlanInput = {
    id?: string;
    debtId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemCreateOrConnectWithoutPlanInput = {
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput>;
};
export type DebtPayoffPlanItemCreateManyPlanInputEnvelope = {
    data: Prisma.DebtPayoffPlanItemCreateManyPlanInput | Prisma.DebtPayoffPlanItemCreateManyPlanInput[];
    skipDuplicates?: boolean;
};
export type DebtPayoffPlanItemUpsertWithWhereUniqueWithoutPlanInput = {
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedUpdateWithoutPlanInput>;
    create: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedCreateWithoutPlanInput>;
};
export type DebtPayoffPlanItemUpdateWithWhereUniqueWithoutPlanInput = {
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateWithoutPlanInput, Prisma.DebtPayoffPlanItemUncheckedUpdateWithoutPlanInput>;
};
export type DebtPayoffPlanItemUpdateManyWithWhereWithoutPlanInput = {
    where: Prisma.DebtPayoffPlanItemScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateManyMutationInput, Prisma.DebtPayoffPlanItemUncheckedUpdateManyWithoutPlanInput>;
};
export type DebtPayoffPlanItemCreateManyDebtInput = {
    id?: string;
    planId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    plan?: Prisma.DebtPayoffPlanUpdateOneRequiredWithoutItemsNestedInput;
};
export type DebtPayoffPlanItemUncheckedUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUncheckedUpdateManyWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemCreateManyPlanInput = {
    id?: string;
    debtId: string;
    order: number;
    payoffMonth: number;
    projectedPayoffDate: Date | string;
    amountPerMonth: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutPlanItemsNestedInput;
};
export type DebtPayoffPlanItemUncheckedUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemUncheckedUpdateManyWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    payoffMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    projectedPayoffDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amountPerMonth?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type DebtPayoffPlanItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    order?: boolean;
    payoffMonth?: boolean;
    projectedPayoffDate?: boolean;
    amountPerMonth?: boolean;
    plan?: boolean | Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayoffPlanItem"]>;
export type DebtPayoffPlanItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    order?: boolean;
    payoffMonth?: boolean;
    projectedPayoffDate?: boolean;
    amountPerMonth?: boolean;
    plan?: boolean | Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayoffPlanItem"]>;
export type DebtPayoffPlanItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    order?: boolean;
    payoffMonth?: boolean;
    projectedPayoffDate?: boolean;
    amountPerMonth?: boolean;
    plan?: boolean | Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayoffPlanItem"]>;
export type DebtPayoffPlanItemSelectScalar = {
    id?: boolean;
    planId?: boolean;
    debtId?: boolean;
    order?: boolean;
    payoffMonth?: boolean;
    projectedPayoffDate?: boolean;
    amountPerMonth?: boolean;
};
export type DebtPayoffPlanItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "planId" | "debtId" | "order" | "payoffMonth" | "projectedPayoffDate" | "amountPerMonth", ExtArgs["result"]["debtPayoffPlanItem"]>;
export type DebtPayoffPlanItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
};
export type DebtPayoffPlanItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
};
export type DebtPayoffPlanItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
};
export type $DebtPayoffPlanItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DebtPayoffPlanItem";
    objects: {
        plan: Prisma.$DebtPayoffPlanPayload<ExtArgs>;
        debt: Prisma.$DebtPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        planId: string;
        debtId: string;
        order: number;
        payoffMonth: number;
        projectedPayoffDate: Date;
        amountPerMonth: runtime.Decimal;
    }, ExtArgs["result"]["debtPayoffPlanItem"]>;
    composites: {};
};
export type DebtPayoffPlanItemGetPayload<S extends boolean | null | undefined | DebtPayoffPlanItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload, S>;
export type DebtPayoffPlanItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DebtPayoffPlanItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DebtPayoffPlanItemCountAggregateInputType | true;
};
export interface DebtPayoffPlanItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DebtPayoffPlanItem'];
        meta: {
            name: 'DebtPayoffPlanItem';
        };
    };
    findUnique<T extends DebtPayoffPlanItemFindUniqueArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DebtPayoffPlanItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DebtPayoffPlanItemFindFirstArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DebtPayoffPlanItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DebtPayoffPlanItemFindManyArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DebtPayoffPlanItemCreateArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemCreateArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DebtPayoffPlanItemCreateManyArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DebtPayoffPlanItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DebtPayoffPlanItemDeleteArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemDeleteArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DebtPayoffPlanItemUpdateArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemUpdateArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DebtPayoffPlanItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DebtPayoffPlanItemUpdateManyArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DebtPayoffPlanItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DebtPayoffPlanItemUpsertArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanItemUpsertArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanItemClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DebtPayoffPlanItemCountArgs>(args?: Prisma.Subset<T, DebtPayoffPlanItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DebtPayoffPlanItemCountAggregateOutputType> : number>;
    aggregate<T extends DebtPayoffPlanItemAggregateArgs>(args: Prisma.Subset<T, DebtPayoffPlanItemAggregateArgs>): Prisma.PrismaPromise<GetDebtPayoffPlanItemAggregateType<T>>;
    groupBy<T extends DebtPayoffPlanItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DebtPayoffPlanItemGroupByArgs['orderBy'];
    } : {
        orderBy?: DebtPayoffPlanItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DebtPayoffPlanItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtPayoffPlanItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DebtPayoffPlanItemFieldRefs;
}
export interface Prisma__DebtPayoffPlanItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plan<T extends Prisma.DebtPayoffPlanDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtPayoffPlanDefaultArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    debt<T extends Prisma.DebtDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtDefaultArgs<ExtArgs>>): Prisma.Prisma__DebtClient<runtime.Types.Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DebtPayoffPlanItemFieldRefs {
    readonly id: Prisma.FieldRef<"DebtPayoffPlanItem", 'String'>;
    readonly planId: Prisma.FieldRef<"DebtPayoffPlanItem", 'String'>;
    readonly debtId: Prisma.FieldRef<"DebtPayoffPlanItem", 'String'>;
    readonly order: Prisma.FieldRef<"DebtPayoffPlanItem", 'Int'>;
    readonly payoffMonth: Prisma.FieldRef<"DebtPayoffPlanItem", 'Int'>;
    readonly projectedPayoffDate: Prisma.FieldRef<"DebtPayoffPlanItem", 'DateTime'>;
    readonly amountPerMonth: Prisma.FieldRef<"DebtPayoffPlanItem", 'Decimal'>;
}
export type DebtPayoffPlanItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
};
export type DebtPayoffPlanItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
};
export type DebtPayoffPlanItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    orderBy?: Prisma.DebtPayoffPlanItemOrderByWithRelationInput | Prisma.DebtPayoffPlanItemOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPayoffPlanItemScalarFieldEnum | Prisma.DebtPayoffPlanItemScalarFieldEnum[];
};
export type DebtPayoffPlanItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    orderBy?: Prisma.DebtPayoffPlanItemOrderByWithRelationInput | Prisma.DebtPayoffPlanItemOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPayoffPlanItemScalarFieldEnum | Prisma.DebtPayoffPlanItemScalarFieldEnum[];
};
export type DebtPayoffPlanItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    orderBy?: Prisma.DebtPayoffPlanItemOrderByWithRelationInput | Prisma.DebtPayoffPlanItemOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPayoffPlanItemScalarFieldEnum | Prisma.DebtPayoffPlanItemScalarFieldEnum[];
};
export type DebtPayoffPlanItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateInput, Prisma.DebtPayoffPlanItemUncheckedCreateInput>;
};
export type DebtPayoffPlanItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DebtPayoffPlanItemCreateManyInput | Prisma.DebtPayoffPlanItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DebtPayoffPlanItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    data: Prisma.DebtPayoffPlanItemCreateManyInput | Prisma.DebtPayoffPlanItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DebtPayoffPlanItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DebtPayoffPlanItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateInput, Prisma.DebtPayoffPlanItemUncheckedUpdateInput>;
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
};
export type DebtPayoffPlanItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateManyMutationInput, Prisma.DebtPayoffPlanItemUncheckedUpdateManyInput>;
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    limit?: number;
};
export type DebtPayoffPlanItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateManyMutationInput, Prisma.DebtPayoffPlanItemUncheckedUpdateManyInput>;
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    limit?: number;
    include?: Prisma.DebtPayoffPlanItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DebtPayoffPlanItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPayoffPlanItemCreateInput, Prisma.DebtPayoffPlanItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DebtPayoffPlanItemUpdateInput, Prisma.DebtPayoffPlanItemUncheckedUpdateInput>;
};
export type DebtPayoffPlanItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanItemWhereUniqueInput;
};
export type DebtPayoffPlanItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanItemWhereInput;
    limit?: number;
};
export type DebtPayoffPlanItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanItemSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanItemOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanItemInclude<ExtArgs> | null;
};
