import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type DebtPayoffPlanModel = runtime.Types.Result.DefaultSelection<Prisma.$DebtPayoffPlanPayload>;
export type AggregateDebtPayoffPlan = {
    _count: DebtPayoffPlanCountAggregateOutputType | null;
    _avg: DebtPayoffPlanAvgAggregateOutputType | null;
    _sum: DebtPayoffPlanSumAggregateOutputType | null;
    _min: DebtPayoffPlanMinAggregateOutputType | null;
    _max: DebtPayoffPlanMaxAggregateOutputType | null;
};
export type DebtPayoffPlanAvgAggregateOutputType = {
    monthlyBudget: runtime.Decimal | null;
    estimatedMonths: number | null;
    estimatedInterest: runtime.Decimal | null;
    estimatedTotal: runtime.Decimal | null;
    baselineInterest: runtime.Decimal | null;
};
export type DebtPayoffPlanSumAggregateOutputType = {
    monthlyBudget: runtime.Decimal | null;
    estimatedMonths: number | null;
    estimatedInterest: runtime.Decimal | null;
    estimatedTotal: runtime.Decimal | null;
    baselineInterest: runtime.Decimal | null;
};
export type DebtPayoffPlanMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    strategy: $Enums.PlanStrategy | null;
    monthlyBudget: runtime.Decimal | null;
    estimatedMonths: number | null;
    estimatedInterest: runtime.Decimal | null;
    estimatedTotal: runtime.Decimal | null;
    baselineInterest: runtime.Decimal | null;
    projectedPayoffDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DebtPayoffPlanMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    strategy: $Enums.PlanStrategy | null;
    monthlyBudget: runtime.Decimal | null;
    estimatedMonths: number | null;
    estimatedInterest: runtime.Decimal | null;
    estimatedTotal: runtime.Decimal | null;
    baselineInterest: runtime.Decimal | null;
    projectedPayoffDate: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type DebtPayoffPlanCountAggregateOutputType = {
    id: number;
    userId: number;
    strategy: number;
    monthlyBudget: number;
    estimatedMonths: number;
    estimatedInterest: number;
    estimatedTotal: number;
    baselineInterest: number;
    projectedPayoffDate: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type DebtPayoffPlanAvgAggregateInputType = {
    monthlyBudget?: true;
    estimatedMonths?: true;
    estimatedInterest?: true;
    estimatedTotal?: true;
    baselineInterest?: true;
};
export type DebtPayoffPlanSumAggregateInputType = {
    monthlyBudget?: true;
    estimatedMonths?: true;
    estimatedInterest?: true;
    estimatedTotal?: true;
    baselineInterest?: true;
};
export type DebtPayoffPlanMinAggregateInputType = {
    id?: true;
    userId?: true;
    strategy?: true;
    monthlyBudget?: true;
    estimatedMonths?: true;
    estimatedInterest?: true;
    estimatedTotal?: true;
    baselineInterest?: true;
    projectedPayoffDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DebtPayoffPlanMaxAggregateInputType = {
    id?: true;
    userId?: true;
    strategy?: true;
    monthlyBudget?: true;
    estimatedMonths?: true;
    estimatedInterest?: true;
    estimatedTotal?: true;
    baselineInterest?: true;
    projectedPayoffDate?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type DebtPayoffPlanCountAggregateInputType = {
    id?: true;
    userId?: true;
    strategy?: true;
    monthlyBudget?: true;
    estimatedMonths?: true;
    estimatedInterest?: true;
    estimatedTotal?: true;
    baselineInterest?: true;
    projectedPayoffDate?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type DebtPayoffPlanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanWhereInput;
    orderBy?: Prisma.DebtPayoffPlanOrderByWithRelationInput | Prisma.DebtPayoffPlanOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DebtPayoffPlanCountAggregateInputType;
    _avg?: DebtPayoffPlanAvgAggregateInputType;
    _sum?: DebtPayoffPlanSumAggregateInputType;
    _min?: DebtPayoffPlanMinAggregateInputType;
    _max?: DebtPayoffPlanMaxAggregateInputType;
};
export type GetDebtPayoffPlanAggregateType<T extends DebtPayoffPlanAggregateArgs> = {
    [P in keyof T & keyof AggregateDebtPayoffPlan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDebtPayoffPlan[P]> : Prisma.GetScalarType<T[P], AggregateDebtPayoffPlan[P]>;
};
export type DebtPayoffPlanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanWhereInput;
    orderBy?: Prisma.DebtPayoffPlanOrderByWithAggregationInput | Prisma.DebtPayoffPlanOrderByWithAggregationInput[];
    by: Prisma.DebtPayoffPlanScalarFieldEnum[] | Prisma.DebtPayoffPlanScalarFieldEnum;
    having?: Prisma.DebtPayoffPlanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DebtPayoffPlanCountAggregateInputType | true;
    _avg?: DebtPayoffPlanAvgAggregateInputType;
    _sum?: DebtPayoffPlanSumAggregateInputType;
    _min?: DebtPayoffPlanMinAggregateInputType;
    _max?: DebtPayoffPlanMaxAggregateInputType;
};
export type DebtPayoffPlanGroupByOutputType = {
    id: string;
    userId: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal;
    estimatedTotal: runtime.Decimal;
    baselineInterest: runtime.Decimal | null;
    projectedPayoffDate: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: DebtPayoffPlanCountAggregateOutputType | null;
    _avg: DebtPayoffPlanAvgAggregateOutputType | null;
    _sum: DebtPayoffPlanSumAggregateOutputType | null;
    _min: DebtPayoffPlanMinAggregateOutputType | null;
    _max: DebtPayoffPlanMaxAggregateOutputType | null;
};
export type GetDebtPayoffPlanGroupByPayload<T extends DebtPayoffPlanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DebtPayoffPlanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DebtPayoffPlanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DebtPayoffPlanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DebtPayoffPlanGroupByOutputType[P]>;
}>>;
export type DebtPayoffPlanWhereInput = {
    AND?: Prisma.DebtPayoffPlanWhereInput | Prisma.DebtPayoffPlanWhereInput[];
    OR?: Prisma.DebtPayoffPlanWhereInput[];
    NOT?: Prisma.DebtPayoffPlanWhereInput | Prisma.DebtPayoffPlanWhereInput[];
    id?: Prisma.UuidFilter<"DebtPayoffPlan"> | string;
    userId?: Prisma.UuidFilter<"DebtPayoffPlan"> | string;
    strategy?: Prisma.EnumPlanStrategyFilter<"DebtPayoffPlan"> | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFilter<"DebtPayoffPlan"> | number;
    estimatedInterest?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.DecimalNullableFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.DateTimeNullableFilter<"DebtPayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtPayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DebtPayoffPlan"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.DebtPayoffPlanItemListRelationFilter;
};
export type DebtPayoffPlanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrderInput | Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    items?: Prisma.DebtPayoffPlanItemOrderByRelationAggregateInput;
};
export type DebtPayoffPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DebtPayoffPlanWhereInput | Prisma.DebtPayoffPlanWhereInput[];
    OR?: Prisma.DebtPayoffPlanWhereInput[];
    NOT?: Prisma.DebtPayoffPlanWhereInput | Prisma.DebtPayoffPlanWhereInput[];
    userId?: Prisma.UuidFilter<"DebtPayoffPlan"> | string;
    strategy?: Prisma.EnumPlanStrategyFilter<"DebtPayoffPlan"> | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFilter<"DebtPayoffPlan"> | number;
    estimatedInterest?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.DecimalNullableFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.DateTimeNullableFilter<"DebtPayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtPayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DebtPayoffPlan"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    items?: Prisma.DebtPayoffPlanItemListRelationFilter;
}, "id">;
export type DebtPayoffPlanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrderInput | Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.DebtPayoffPlanCountOrderByAggregateInput;
    _avg?: Prisma.DebtPayoffPlanAvgOrderByAggregateInput;
    _max?: Prisma.DebtPayoffPlanMaxOrderByAggregateInput;
    _min?: Prisma.DebtPayoffPlanMinOrderByAggregateInput;
    _sum?: Prisma.DebtPayoffPlanSumOrderByAggregateInput;
};
export type DebtPayoffPlanScalarWhereWithAggregatesInput = {
    AND?: Prisma.DebtPayoffPlanScalarWhereWithAggregatesInput | Prisma.DebtPayoffPlanScalarWhereWithAggregatesInput[];
    OR?: Prisma.DebtPayoffPlanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DebtPayoffPlanScalarWhereWithAggregatesInput | Prisma.DebtPayoffPlanScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DebtPayoffPlan"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"DebtPayoffPlan"> | string;
    strategy?: Prisma.EnumPlanStrategyWithAggregatesFilter<"DebtPayoffPlan"> | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalWithAggregatesFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntWithAggregatesFilter<"DebtPayoffPlan"> | number;
    estimatedInterest?: Prisma.DecimalWithAggregatesFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalWithAggregatesFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.DecimalNullableWithAggregatesFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.DateTimeNullableWithAggregatesFilter<"DebtPayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DebtPayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"DebtPayoffPlan"> | Date | string;
};
export type DebtPayoffPlanCreateInput = {
    id?: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPayoffPlansInput;
    items?: Prisma.DebtPayoffPlanItemCreateNestedManyWithoutPlanInput;
};
export type DebtPayoffPlanUncheckedCreateInput = {
    id?: string;
    userId: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.DebtPayoffPlanItemUncheckedCreateNestedManyWithoutPlanInput;
};
export type DebtPayoffPlanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPayoffPlansNestedInput;
    items?: Prisma.DebtPayoffPlanItemUpdateManyWithoutPlanNestedInput;
};
export type DebtPayoffPlanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.DebtPayoffPlanItemUncheckedUpdateManyWithoutPlanNestedInput;
};
export type DebtPayoffPlanCreateManyInput = {
    id?: string;
    userId: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DebtPayoffPlanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPayoffPlanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPayoffPlanListRelationFilter = {
    every?: Prisma.DebtPayoffPlanWhereInput;
    some?: Prisma.DebtPayoffPlanWhereInput;
    none?: Prisma.DebtPayoffPlanWhereInput;
};
export type DebtPayoffPlanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DebtPayoffPlanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DebtPayoffPlanAvgOrderByAggregateInput = {
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrder;
};
export type DebtPayoffPlanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DebtPayoffPlanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    strategy?: Prisma.SortOrder;
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrder;
    projectedPayoffDate?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type DebtPayoffPlanSumOrderByAggregateInput = {
    monthlyBudget?: Prisma.SortOrder;
    estimatedMonths?: Prisma.SortOrder;
    estimatedInterest?: Prisma.SortOrder;
    estimatedTotal?: Prisma.SortOrder;
    baselineInterest?: Prisma.SortOrder;
};
export type DebtPayoffPlanScalarRelationFilter = {
    is?: Prisma.DebtPayoffPlanWhereInput;
    isNot?: Prisma.DebtPayoffPlanWhereInput;
};
export type DebtPayoffPlanCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput> | Prisma.DebtPayoffPlanCreateWithoutUserInput[] | Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput | Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DebtPayoffPlanCreateManyUserInputEnvelope;
    connect?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
};
export type DebtPayoffPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput> | Prisma.DebtPayoffPlanCreateWithoutUserInput[] | Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput | Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DebtPayoffPlanCreateManyUserInputEnvelope;
    connect?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
};
export type DebtPayoffPlanUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput> | Prisma.DebtPayoffPlanCreateWithoutUserInput[] | Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput | Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DebtPayoffPlanUpsertWithWhereUniqueWithoutUserInput | Prisma.DebtPayoffPlanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DebtPayoffPlanCreateManyUserInputEnvelope;
    set?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    disconnect?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    delete?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    connect?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    update?: Prisma.DebtPayoffPlanUpdateWithWhereUniqueWithoutUserInput | Prisma.DebtPayoffPlanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DebtPayoffPlanUpdateManyWithWhereWithoutUserInput | Prisma.DebtPayoffPlanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DebtPayoffPlanScalarWhereInput | Prisma.DebtPayoffPlanScalarWhereInput[];
};
export type DebtPayoffPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput> | Prisma.DebtPayoffPlanCreateWithoutUserInput[] | Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput | Prisma.DebtPayoffPlanCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DebtPayoffPlanUpsertWithWhereUniqueWithoutUserInput | Prisma.DebtPayoffPlanUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DebtPayoffPlanCreateManyUserInputEnvelope;
    set?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    disconnect?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    delete?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    connect?: Prisma.DebtPayoffPlanWhereUniqueInput | Prisma.DebtPayoffPlanWhereUniqueInput[];
    update?: Prisma.DebtPayoffPlanUpdateWithWhereUniqueWithoutUserInput | Prisma.DebtPayoffPlanUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DebtPayoffPlanUpdateManyWithWhereWithoutUserInput | Prisma.DebtPayoffPlanUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DebtPayoffPlanScalarWhereInput | Prisma.DebtPayoffPlanScalarWhereInput[];
};
export type EnumPlanStrategyFieldUpdateOperationsInput = {
    set?: $Enums.PlanStrategy;
};
export type DebtPayoffPlanCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutItemsInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.DebtPayoffPlanCreateOrConnectWithoutItemsInput;
    connect?: Prisma.DebtPayoffPlanWhereUniqueInput;
};
export type DebtPayoffPlanUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutItemsInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.DebtPayoffPlanCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.DebtPayoffPlanUpsertWithoutItemsInput;
    connect?: Prisma.DebtPayoffPlanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DebtPayoffPlanUpdateToOneWithWhereWithoutItemsInput, Prisma.DebtPayoffPlanUpdateWithoutItemsInput>, Prisma.DebtPayoffPlanUncheckedUpdateWithoutItemsInput>;
};
export type DebtPayoffPlanCreateWithoutUserInput = {
    id?: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.DebtPayoffPlanItemCreateNestedManyWithoutPlanInput;
};
export type DebtPayoffPlanUncheckedCreateWithoutUserInput = {
    id?: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.DebtPayoffPlanItemUncheckedCreateNestedManyWithoutPlanInput;
};
export type DebtPayoffPlanCreateOrConnectWithoutUserInput = {
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput>;
};
export type DebtPayoffPlanCreateManyUserInputEnvelope = {
    data: Prisma.DebtPayoffPlanCreateManyUserInput | Prisma.DebtPayoffPlanCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DebtPayoffPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtPayoffPlanUpdateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutUserInput>;
};
export type DebtPayoffPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanUpdateWithoutUserInput, Prisma.DebtPayoffPlanUncheckedUpdateWithoutUserInput>;
};
export type DebtPayoffPlanUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DebtPayoffPlanScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanUpdateManyMutationInput, Prisma.DebtPayoffPlanUncheckedUpdateManyWithoutUserInput>;
};
export type DebtPayoffPlanScalarWhereInput = {
    AND?: Prisma.DebtPayoffPlanScalarWhereInput | Prisma.DebtPayoffPlanScalarWhereInput[];
    OR?: Prisma.DebtPayoffPlanScalarWhereInput[];
    NOT?: Prisma.DebtPayoffPlanScalarWhereInput | Prisma.DebtPayoffPlanScalarWhereInput[];
    id?: Prisma.UuidFilter<"DebtPayoffPlan"> | string;
    userId?: Prisma.UuidFilter<"DebtPayoffPlan"> | string;
    strategy?: Prisma.EnumPlanStrategyFilter<"DebtPayoffPlan"> | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFilter<"DebtPayoffPlan"> | number;
    estimatedInterest?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.DecimalNullableFilter<"DebtPayoffPlan"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.DateTimeNullableFilter<"DebtPayoffPlan"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtPayoffPlan"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"DebtPayoffPlan"> | Date | string;
};
export type DebtPayoffPlanCreateWithoutItemsInput = {
    id?: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPayoffPlansInput;
};
export type DebtPayoffPlanUncheckedCreateWithoutItemsInput = {
    id?: string;
    userId: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DebtPayoffPlanCreateOrConnectWithoutItemsInput = {
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutItemsInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutItemsInput>;
};
export type DebtPayoffPlanUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.DebtPayoffPlanUpdateWithoutItemsInput, Prisma.DebtPayoffPlanUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.DebtPayoffPlanCreateWithoutItemsInput, Prisma.DebtPayoffPlanUncheckedCreateWithoutItemsInput>;
    where?: Prisma.DebtPayoffPlanWhereInput;
};
export type DebtPayoffPlanUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.DebtPayoffPlanWhereInput;
    data: Prisma.XOR<Prisma.DebtPayoffPlanUpdateWithoutItemsInput, Prisma.DebtPayoffPlanUncheckedUpdateWithoutItemsInput>;
};
export type DebtPayoffPlanUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPayoffPlansNestedInput;
};
export type DebtPayoffPlanUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPayoffPlanCreateManyUserInput = {
    id?: string;
    strategy: $Enums.PlanStrategy;
    monthlyBudget: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths: number;
    estimatedInterest: runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal: runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type DebtPayoffPlanUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.DebtPayoffPlanItemUpdateManyWithoutPlanNestedInput;
};
export type DebtPayoffPlanUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.DebtPayoffPlanItemUncheckedUpdateManyWithoutPlanNestedInput;
};
export type DebtPayoffPlanUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    strategy?: Prisma.EnumPlanStrategyFieldUpdateOperationsInput | $Enums.PlanStrategy;
    monthlyBudget?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedMonths?: Prisma.IntFieldUpdateOperationsInput | number;
    estimatedInterest?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    estimatedTotal?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    baselineInterest?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    projectedPayoffDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtPayoffPlanCountOutputType = {
    items: number;
};
export type DebtPayoffPlanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | DebtPayoffPlanCountOutputTypeCountItemsArgs;
};
export type DebtPayoffPlanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanCountOutputTypeSelect<ExtArgs> | null;
};
export type DebtPayoffPlanCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanItemWhereInput;
};
export type DebtPayoffPlanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    monthlyBudget?: boolean;
    estimatedMonths?: boolean;
    estimatedInterest?: boolean;
    estimatedTotal?: boolean;
    baselineInterest?: boolean;
    projectedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.DebtPayoffPlan$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.DebtPayoffPlanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayoffPlan"]>;
export type DebtPayoffPlanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    monthlyBudget?: boolean;
    estimatedMonths?: boolean;
    estimatedInterest?: boolean;
    estimatedTotal?: boolean;
    baselineInterest?: boolean;
    projectedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayoffPlan"]>;
export type DebtPayoffPlanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    monthlyBudget?: boolean;
    estimatedMonths?: boolean;
    estimatedInterest?: boolean;
    estimatedTotal?: boolean;
    baselineInterest?: boolean;
    projectedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtPayoffPlan"]>;
export type DebtPayoffPlanSelectScalar = {
    id?: boolean;
    userId?: boolean;
    strategy?: boolean;
    monthlyBudget?: boolean;
    estimatedMonths?: boolean;
    estimatedInterest?: boolean;
    estimatedTotal?: boolean;
    baselineInterest?: boolean;
    projectedPayoffDate?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type DebtPayoffPlanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "strategy" | "monthlyBudget" | "estimatedMonths" | "estimatedInterest" | "estimatedTotal" | "baselineInterest" | "projectedPayoffDate" | "createdAt" | "updatedAt", ExtArgs["result"]["debtPayoffPlan"]>;
export type DebtPayoffPlanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.DebtPayoffPlan$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.DebtPayoffPlanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DebtPayoffPlanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DebtPayoffPlanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DebtPayoffPlanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DebtPayoffPlan";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        items: Prisma.$DebtPayoffPlanItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        strategy: $Enums.PlanStrategy;
        monthlyBudget: runtime.Decimal;
        estimatedMonths: number;
        estimatedInterest: runtime.Decimal;
        estimatedTotal: runtime.Decimal;
        baselineInterest: runtime.Decimal | null;
        projectedPayoffDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["debtPayoffPlan"]>;
    composites: {};
};
export type DebtPayoffPlanGetPayload<S extends boolean | null | undefined | DebtPayoffPlanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload, S>;
export type DebtPayoffPlanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DebtPayoffPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DebtPayoffPlanCountAggregateInputType | true;
};
export interface DebtPayoffPlanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DebtPayoffPlan'];
        meta: {
            name: 'DebtPayoffPlan';
        };
    };
    findUnique<T extends DebtPayoffPlanFindUniqueArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DebtPayoffPlanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DebtPayoffPlanFindFirstArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanFindFirstArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DebtPayoffPlanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DebtPayoffPlanFindManyArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DebtPayoffPlanCreateArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanCreateArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DebtPayoffPlanCreateManyArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DebtPayoffPlanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DebtPayoffPlanDeleteArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanDeleteArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DebtPayoffPlanUpdateArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanUpdateArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DebtPayoffPlanDeleteManyArgs>(args?: Prisma.SelectSubset<T, DebtPayoffPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DebtPayoffPlanUpdateManyArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DebtPayoffPlanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DebtPayoffPlanUpsertArgs>(args: Prisma.SelectSubset<T, DebtPayoffPlanUpsertArgs<ExtArgs>>): Prisma.Prisma__DebtPayoffPlanClient<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DebtPayoffPlanCountArgs>(args?: Prisma.Subset<T, DebtPayoffPlanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DebtPayoffPlanCountAggregateOutputType> : number>;
    aggregate<T extends DebtPayoffPlanAggregateArgs>(args: Prisma.Subset<T, DebtPayoffPlanAggregateArgs>): Prisma.PrismaPromise<GetDebtPayoffPlanAggregateType<T>>;
    groupBy<T extends DebtPayoffPlanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DebtPayoffPlanGroupByArgs['orderBy'];
    } : {
        orderBy?: DebtPayoffPlanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DebtPayoffPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtPayoffPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DebtPayoffPlanFieldRefs;
}
export interface Prisma__DebtPayoffPlanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.DebtPayoffPlan$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtPayoffPlan$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPayoffPlanItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DebtPayoffPlanFieldRefs {
    readonly id: Prisma.FieldRef<"DebtPayoffPlan", 'String'>;
    readonly userId: Prisma.FieldRef<"DebtPayoffPlan", 'String'>;
    readonly strategy: Prisma.FieldRef<"DebtPayoffPlan", 'PlanStrategy'>;
    readonly monthlyBudget: Prisma.FieldRef<"DebtPayoffPlan", 'Decimal'>;
    readonly estimatedMonths: Prisma.FieldRef<"DebtPayoffPlan", 'Int'>;
    readonly estimatedInterest: Prisma.FieldRef<"DebtPayoffPlan", 'Decimal'>;
    readonly estimatedTotal: Prisma.FieldRef<"DebtPayoffPlan", 'Decimal'>;
    readonly baselineInterest: Prisma.FieldRef<"DebtPayoffPlan", 'Decimal'>;
    readonly projectedPayoffDate: Prisma.FieldRef<"DebtPayoffPlan", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"DebtPayoffPlan", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"DebtPayoffPlan", 'DateTime'>;
}
export type DebtPayoffPlanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
};
export type DebtPayoffPlanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
};
export type DebtPayoffPlanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where?: Prisma.DebtPayoffPlanWhereInput;
    orderBy?: Prisma.DebtPayoffPlanOrderByWithRelationInput | Prisma.DebtPayoffPlanOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPayoffPlanScalarFieldEnum | Prisma.DebtPayoffPlanScalarFieldEnum[];
};
export type DebtPayoffPlanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where?: Prisma.DebtPayoffPlanWhereInput;
    orderBy?: Prisma.DebtPayoffPlanOrderByWithRelationInput | Prisma.DebtPayoffPlanOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPayoffPlanScalarFieldEnum | Prisma.DebtPayoffPlanScalarFieldEnum[];
};
export type DebtPayoffPlanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where?: Prisma.DebtPayoffPlanWhereInput;
    orderBy?: Prisma.DebtPayoffPlanOrderByWithRelationInput | Prisma.DebtPayoffPlanOrderByWithRelationInput[];
    cursor?: Prisma.DebtPayoffPlanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtPayoffPlanScalarFieldEnum | Prisma.DebtPayoffPlanScalarFieldEnum[];
};
export type DebtPayoffPlanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPayoffPlanCreateInput, Prisma.DebtPayoffPlanUncheckedCreateInput>;
};
export type DebtPayoffPlanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DebtPayoffPlanCreateManyInput | Prisma.DebtPayoffPlanCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DebtPayoffPlanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    data: Prisma.DebtPayoffPlanCreateManyInput | Prisma.DebtPayoffPlanCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DebtPayoffPlanIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DebtPayoffPlanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPayoffPlanUpdateInput, Prisma.DebtPayoffPlanUncheckedUpdateInput>;
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
};
export type DebtPayoffPlanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DebtPayoffPlanUpdateManyMutationInput, Prisma.DebtPayoffPlanUncheckedUpdateManyInput>;
    where?: Prisma.DebtPayoffPlanWhereInput;
    limit?: number;
};
export type DebtPayoffPlanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtPayoffPlanUpdateManyMutationInput, Prisma.DebtPayoffPlanUncheckedUpdateManyInput>;
    where?: Prisma.DebtPayoffPlanWhereInput;
    limit?: number;
    include?: Prisma.DebtPayoffPlanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DebtPayoffPlanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtPayoffPlanCreateInput, Prisma.DebtPayoffPlanUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DebtPayoffPlanUpdateInput, Prisma.DebtPayoffPlanUncheckedUpdateInput>;
};
export type DebtPayoffPlanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
    where: Prisma.DebtPayoffPlanWhereUniqueInput;
};
export type DebtPayoffPlanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPayoffPlanWhereInput;
    limit?: number;
};
export type DebtPayoffPlan$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type DebtPayoffPlanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtPayoffPlanSelect<ExtArgs> | null;
    omit?: Prisma.DebtPayoffPlanOmit<ExtArgs> | null;
    include?: Prisma.DebtPayoffPlanInclude<ExtArgs> | null;
};
