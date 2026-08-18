import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type GoalModel = runtime.Types.Result.DefaultSelection<Prisma.$GoalPayload>;
export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null;
    _avg: GoalAvgAggregateOutputType | null;
    _sum: GoalSumAggregateOutputType | null;
    _min: GoalMinAggregateOutputType | null;
    _max: GoalMaxAggregateOutputType | null;
};
export type GoalAvgAggregateOutputType = {
    targetAmount: runtime.Decimal | null;
    currentAmount: runtime.Decimal | null;
};
export type GoalSumAggregateOutputType = {
    targetAmount: runtime.Decimal | null;
    currentAmount: runtime.Decimal | null;
};
export type GoalMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    emoji: string | null;
    targetAmount: runtime.Decimal | null;
    currentAmount: runtime.Decimal | null;
    targetDate: Date | null;
    priority: $Enums.DebtPriority | null;
    status: $Enums.GoalStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GoalMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    emoji: string | null;
    targetAmount: runtime.Decimal | null;
    currentAmount: runtime.Decimal | null;
    targetDate: Date | null;
    priority: $Enums.DebtPriority | null;
    status: $Enums.GoalStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type GoalCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    emoji: number;
    targetAmount: number;
    currentAmount: number;
    targetDate: number;
    priority: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type GoalAvgAggregateInputType = {
    targetAmount?: true;
    currentAmount?: true;
};
export type GoalSumAggregateInputType = {
    targetAmount?: true;
    currentAmount?: true;
};
export type GoalMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    emoji?: true;
    targetAmount?: true;
    currentAmount?: true;
    targetDate?: true;
    priority?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GoalMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    emoji?: true;
    targetAmount?: true;
    currentAmount?: true;
    targetDate?: true;
    priority?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type GoalCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    emoji?: true;
    targetAmount?: true;
    currentAmount?: true;
    targetDate?: true;
    priority?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type GoalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoalWhereInput;
    orderBy?: Prisma.GoalOrderByWithRelationInput | Prisma.GoalOrderByWithRelationInput[];
    cursor?: Prisma.GoalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GoalCountAggregateInputType;
    _avg?: GoalAvgAggregateInputType;
    _sum?: GoalSumAggregateInputType;
    _min?: GoalMinAggregateInputType;
    _max?: GoalMaxAggregateInputType;
};
export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
    [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGoal[P]> : Prisma.GetScalarType<T[P], AggregateGoal[P]>;
};
export type GoalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoalWhereInput;
    orderBy?: Prisma.GoalOrderByWithAggregationInput | Prisma.GoalOrderByWithAggregationInput[];
    by: Prisma.GoalScalarFieldEnum[] | Prisma.GoalScalarFieldEnum;
    having?: Prisma.GoalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GoalCountAggregateInputType | true;
    _avg?: GoalAvgAggregateInputType;
    _sum?: GoalSumAggregateInputType;
    _min?: GoalMinAggregateInputType;
    _max?: GoalMaxAggregateInputType;
};
export type GoalGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    emoji: string | null;
    targetAmount: runtime.Decimal;
    currentAmount: runtime.Decimal;
    targetDate: Date | null;
    priority: $Enums.DebtPriority;
    status: $Enums.GoalStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: GoalCountAggregateOutputType | null;
    _avg: GoalAvgAggregateOutputType | null;
    _sum: GoalSumAggregateOutputType | null;
    _min: GoalMinAggregateOutputType | null;
    _max: GoalMaxAggregateOutputType | null;
};
export type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GoalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GoalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GoalGroupByOutputType[P]>;
}>>;
export type GoalWhereInput = {
    AND?: Prisma.GoalWhereInput | Prisma.GoalWhereInput[];
    OR?: Prisma.GoalWhereInput[];
    NOT?: Prisma.GoalWhereInput | Prisma.GoalWhereInput[];
    id?: Prisma.UuidFilter<"Goal"> | string;
    userId?: Prisma.UuidFilter<"Goal"> | string;
    name?: Prisma.StringFilter<"Goal"> | string;
    emoji?: Prisma.StringNullableFilter<"Goal"> | string | null;
    targetAmount?: Prisma.DecimalFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.DateTimeNullableFilter<"Goal"> | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFilter<"Goal"> | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFilter<"Goal"> | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFilter<"Goal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Goal"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type GoalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emoji?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
    targetDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GoalWhereInput | Prisma.GoalWhereInput[];
    OR?: Prisma.GoalWhereInput[];
    NOT?: Prisma.GoalWhereInput | Prisma.GoalWhereInput[];
    userId?: Prisma.UuidFilter<"Goal"> | string;
    name?: Prisma.StringFilter<"Goal"> | string;
    emoji?: Prisma.StringNullableFilter<"Goal"> | string | null;
    targetAmount?: Prisma.DecimalFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.DateTimeNullableFilter<"Goal"> | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFilter<"Goal"> | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFilter<"Goal"> | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFilter<"Goal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Goal"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type GoalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emoji?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
    targetDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.GoalCountOrderByAggregateInput;
    _avg?: Prisma.GoalAvgOrderByAggregateInput;
    _max?: Prisma.GoalMaxOrderByAggregateInput;
    _min?: Prisma.GoalMinOrderByAggregateInput;
    _sum?: Prisma.GoalSumOrderByAggregateInput;
};
export type GoalScalarWhereWithAggregatesInput = {
    AND?: Prisma.GoalScalarWhereWithAggregatesInput | Prisma.GoalScalarWhereWithAggregatesInput[];
    OR?: Prisma.GoalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GoalScalarWhereWithAggregatesInput | Prisma.GoalScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Goal"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"Goal"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Goal"> | string;
    emoji?: Prisma.StringNullableWithAggregatesFilter<"Goal"> | string | null;
    targetAmount?: Prisma.DecimalWithAggregatesFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalWithAggregatesFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.DateTimeNullableWithAggregatesFilter<"Goal"> | Date | string | null;
    priority?: Prisma.EnumDebtPriorityWithAggregatesFilter<"Goal"> | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusWithAggregatesFilter<"Goal"> | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Goal"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Goal"> | Date | string;
};
export type GoalCreateInput = {
    id?: string;
    name: string;
    emoji?: string | null;
    targetAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Date | string | null;
    priority?: $Enums.DebtPriority;
    status?: $Enums.GoalStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutGoalsInput;
};
export type GoalUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    emoji?: string | null;
    targetAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Date | string | null;
    priority?: $Enums.DebtPriority;
    status?: $Enums.GoalStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutGoalsNestedInput;
};
export type GoalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoalCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    emoji?: string | null;
    targetAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Date | string | null;
    priority?: $Enums.DebtPriority;
    status?: $Enums.GoalStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoalListRelationFilter = {
    every?: Prisma.GoalWhereInput;
    some?: Prisma.GoalWhereInput;
    none?: Prisma.GoalWhereInput;
};
export type GoalOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GoalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
    targetDate?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GoalAvgOrderByAggregateInput = {
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
};
export type GoalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
    targetDate?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GoalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    emoji?: Prisma.SortOrder;
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
    targetDate?: Prisma.SortOrder;
    priority?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type GoalSumOrderByAggregateInput = {
    targetAmount?: Prisma.SortOrder;
    currentAmount?: Prisma.SortOrder;
};
export type GoalCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.GoalCreateWithoutUserInput, Prisma.GoalUncheckedCreateWithoutUserInput> | Prisma.GoalCreateWithoutUserInput[] | Prisma.GoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GoalCreateOrConnectWithoutUserInput | Prisma.GoalCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.GoalCreateManyUserInputEnvelope;
    connect?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
};
export type GoalUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.GoalCreateWithoutUserInput, Prisma.GoalUncheckedCreateWithoutUserInput> | Prisma.GoalCreateWithoutUserInput[] | Prisma.GoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GoalCreateOrConnectWithoutUserInput | Prisma.GoalCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.GoalCreateManyUserInputEnvelope;
    connect?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
};
export type GoalUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.GoalCreateWithoutUserInput, Prisma.GoalUncheckedCreateWithoutUserInput> | Prisma.GoalCreateWithoutUserInput[] | Prisma.GoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GoalCreateOrConnectWithoutUserInput | Prisma.GoalCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.GoalUpsertWithWhereUniqueWithoutUserInput | Prisma.GoalUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.GoalCreateManyUserInputEnvelope;
    set?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    disconnect?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    delete?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    connect?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    update?: Prisma.GoalUpdateWithWhereUniqueWithoutUserInput | Prisma.GoalUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.GoalUpdateManyWithWhereWithoutUserInput | Prisma.GoalUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.GoalScalarWhereInput | Prisma.GoalScalarWhereInput[];
};
export type GoalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.GoalCreateWithoutUserInput, Prisma.GoalUncheckedCreateWithoutUserInput> | Prisma.GoalCreateWithoutUserInput[] | Prisma.GoalUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.GoalCreateOrConnectWithoutUserInput | Prisma.GoalCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.GoalUpsertWithWhereUniqueWithoutUserInput | Prisma.GoalUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.GoalCreateManyUserInputEnvelope;
    set?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    disconnect?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    delete?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    connect?: Prisma.GoalWhereUniqueInput | Prisma.GoalWhereUniqueInput[];
    update?: Prisma.GoalUpdateWithWhereUniqueWithoutUserInput | Prisma.GoalUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.GoalUpdateManyWithWhereWithoutUserInput | Prisma.GoalUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.GoalScalarWhereInput | Prisma.GoalScalarWhereInput[];
};
export type EnumGoalStatusFieldUpdateOperationsInput = {
    set?: $Enums.GoalStatus;
};
export type GoalCreateWithoutUserInput = {
    id?: string;
    name: string;
    emoji?: string | null;
    targetAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Date | string | null;
    priority?: $Enums.DebtPriority;
    status?: $Enums.GoalStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoalUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    emoji?: string | null;
    targetAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Date | string | null;
    priority?: $Enums.DebtPriority;
    status?: $Enums.GoalStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoalCreateOrConnectWithoutUserInput = {
    where: Prisma.GoalWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoalCreateWithoutUserInput, Prisma.GoalUncheckedCreateWithoutUserInput>;
};
export type GoalCreateManyUserInputEnvelope = {
    data: Prisma.GoalCreateManyUserInput | Prisma.GoalCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type GoalUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.GoalWhereUniqueInput;
    update: Prisma.XOR<Prisma.GoalUpdateWithoutUserInput, Prisma.GoalUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.GoalCreateWithoutUserInput, Prisma.GoalUncheckedCreateWithoutUserInput>;
};
export type GoalUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.GoalWhereUniqueInput;
    data: Prisma.XOR<Prisma.GoalUpdateWithoutUserInput, Prisma.GoalUncheckedUpdateWithoutUserInput>;
};
export type GoalUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.GoalScalarWhereInput;
    data: Prisma.XOR<Prisma.GoalUpdateManyMutationInput, Prisma.GoalUncheckedUpdateManyWithoutUserInput>;
};
export type GoalScalarWhereInput = {
    AND?: Prisma.GoalScalarWhereInput | Prisma.GoalScalarWhereInput[];
    OR?: Prisma.GoalScalarWhereInput[];
    NOT?: Prisma.GoalScalarWhereInput | Prisma.GoalScalarWhereInput[];
    id?: Prisma.UuidFilter<"Goal"> | string;
    userId?: Prisma.UuidFilter<"Goal"> | string;
    name?: Prisma.StringFilter<"Goal"> | string;
    emoji?: Prisma.StringNullableFilter<"Goal"> | string | null;
    targetAmount?: Prisma.DecimalFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFilter<"Goal"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.DateTimeNullableFilter<"Goal"> | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFilter<"Goal"> | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFilter<"Goal"> | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFilter<"Goal"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Goal"> | Date | string;
};
export type GoalCreateManyUserInput = {
    id?: string;
    name: string;
    emoji?: string | null;
    targetAmount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Date | string | null;
    priority?: $Enums.DebtPriority;
    status?: $Enums.GoalStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type GoalUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoalUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoalUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    emoji?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    currentAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    targetDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    priority?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    status?: Prisma.EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GoalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    emoji?: boolean;
    targetAmount?: boolean;
    currentAmount?: boolean;
    targetDate?: boolean;
    priority?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["goal"]>;
export type GoalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    emoji?: boolean;
    targetAmount?: boolean;
    currentAmount?: boolean;
    targetDate?: boolean;
    priority?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["goal"]>;
export type GoalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    emoji?: boolean;
    targetAmount?: boolean;
    currentAmount?: boolean;
    targetDate?: boolean;
    priority?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["goal"]>;
export type GoalSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    emoji?: boolean;
    targetAmount?: boolean;
    currentAmount?: boolean;
    targetDate?: boolean;
    priority?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type GoalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "emoji" | "targetAmount" | "currentAmount" | "targetDate" | "priority" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["goal"]>;
export type GoalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type GoalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type GoalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $GoalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Goal";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        emoji: string | null;
        targetAmount: runtime.Decimal;
        currentAmount: runtime.Decimal;
        targetDate: Date | null;
        priority: $Enums.DebtPriority;
        status: $Enums.GoalStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["goal"]>;
    composites: {};
};
export type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GoalPayload, S>;
export type GoalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GoalCountAggregateInputType | true;
};
export interface GoalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Goal'];
        meta: {
            name: 'Goal';
        };
    };
    findUnique<T extends GoalFindUniqueArgs>(args: Prisma.SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GoalFindFirstArgs>(args?: Prisma.SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GoalFindManyArgs>(args?: Prisma.SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GoalCreateArgs>(args: Prisma.SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GoalCreateManyArgs>(args?: Prisma.SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GoalDeleteArgs>(args: Prisma.SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GoalUpdateArgs>(args: Prisma.SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GoalDeleteManyArgs>(args?: Prisma.SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GoalUpdateManyArgs>(args: Prisma.SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GoalUpsertArgs>(args: Prisma.SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma.Prisma__GoalClient<runtime.Types.Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GoalCountArgs>(args?: Prisma.Subset<T, GoalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GoalCountAggregateOutputType> : number>;
    aggregate<T extends GoalAggregateArgs>(args: Prisma.Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>;
    groupBy<T extends GoalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GoalGroupByArgs['orderBy'];
    } : {
        orderBy?: GoalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GoalFieldRefs;
}
export interface Prisma__GoalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GoalFieldRefs {
    readonly id: Prisma.FieldRef<"Goal", 'String'>;
    readonly userId: Prisma.FieldRef<"Goal", 'String'>;
    readonly name: Prisma.FieldRef<"Goal", 'String'>;
    readonly emoji: Prisma.FieldRef<"Goal", 'String'>;
    readonly targetAmount: Prisma.FieldRef<"Goal", 'Decimal'>;
    readonly currentAmount: Prisma.FieldRef<"Goal", 'Decimal'>;
    readonly targetDate: Prisma.FieldRef<"Goal", 'DateTime'>;
    readonly priority: Prisma.FieldRef<"Goal", 'DebtPriority'>;
    readonly status: Prisma.FieldRef<"Goal", 'GoalStatus'>;
    readonly createdAt: Prisma.FieldRef<"Goal", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Goal", 'DateTime'>;
}
export type GoalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where: Prisma.GoalWhereUniqueInput;
};
export type GoalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where: Prisma.GoalWhereUniqueInput;
};
export type GoalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where?: Prisma.GoalWhereInput;
    orderBy?: Prisma.GoalOrderByWithRelationInput | Prisma.GoalOrderByWithRelationInput[];
    cursor?: Prisma.GoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoalScalarFieldEnum | Prisma.GoalScalarFieldEnum[];
};
export type GoalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where?: Prisma.GoalWhereInput;
    orderBy?: Prisma.GoalOrderByWithRelationInput | Prisma.GoalOrderByWithRelationInput[];
    cursor?: Prisma.GoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoalScalarFieldEnum | Prisma.GoalScalarFieldEnum[];
};
export type GoalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where?: Prisma.GoalWhereInput;
    orderBy?: Prisma.GoalOrderByWithRelationInput | Prisma.GoalOrderByWithRelationInput[];
    cursor?: Prisma.GoalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GoalScalarFieldEnum | Prisma.GoalScalarFieldEnum[];
};
export type GoalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoalCreateInput, Prisma.GoalUncheckedCreateInput>;
};
export type GoalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GoalCreateManyInput | Prisma.GoalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GoalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    data: Prisma.GoalCreateManyInput | Prisma.GoalCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GoalIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GoalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoalUpdateInput, Prisma.GoalUncheckedUpdateInput>;
    where: Prisma.GoalWhereUniqueInput;
};
export type GoalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GoalUpdateManyMutationInput, Prisma.GoalUncheckedUpdateManyInput>;
    where?: Prisma.GoalWhereInput;
    limit?: number;
};
export type GoalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GoalUpdateManyMutationInput, Prisma.GoalUncheckedUpdateManyInput>;
    where?: Prisma.GoalWhereInput;
    limit?: number;
    include?: Prisma.GoalIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GoalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where: Prisma.GoalWhereUniqueInput;
    create: Prisma.XOR<Prisma.GoalCreateInput, Prisma.GoalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GoalUpdateInput, Prisma.GoalUncheckedUpdateInput>;
};
export type GoalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
    where: Prisma.GoalWhereUniqueInput;
};
export type GoalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GoalWhereInput;
    limit?: number;
};
export type GoalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GoalSelect<ExtArgs> | null;
    omit?: Prisma.GoalOmit<ExtArgs> | null;
    include?: Prisma.GoalInclude<ExtArgs> | null;
};
