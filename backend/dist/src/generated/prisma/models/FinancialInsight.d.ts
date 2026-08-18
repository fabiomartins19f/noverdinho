import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FinancialInsightModel = runtime.Types.Result.DefaultSelection<Prisma.$FinancialInsightPayload>;
export type AggregateFinancialInsight = {
    _count: FinancialInsightCountAggregateOutputType | null;
    _min: FinancialInsightMinAggregateOutputType | null;
    _max: FinancialInsightMaxAggregateOutputType | null;
};
export type FinancialInsightMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.InsightType | null;
    title: string | null;
    description: string | null;
    action: string | null;
    importance: $Enums.DebtPriority | null;
    isRead: boolean | null;
    createdAt: Date | null;
};
export type FinancialInsightMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.InsightType | null;
    title: string | null;
    description: string | null;
    action: string | null;
    importance: $Enums.DebtPriority | null;
    isRead: boolean | null;
    createdAt: Date | null;
};
export type FinancialInsightCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    title: number;
    description: number;
    action: number;
    importance: number;
    isRead: number;
    createdAt: number;
    _all: number;
};
export type FinancialInsightMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    title?: true;
    description?: true;
    action?: true;
    importance?: true;
    isRead?: true;
    createdAt?: true;
};
export type FinancialInsightMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    title?: true;
    description?: true;
    action?: true;
    importance?: true;
    isRead?: true;
    createdAt?: true;
};
export type FinancialInsightCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    title?: true;
    description?: true;
    action?: true;
    importance?: true;
    isRead?: true;
    createdAt?: true;
    _all?: true;
};
export type FinancialInsightAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinancialInsightWhereInput;
    orderBy?: Prisma.FinancialInsightOrderByWithRelationInput | Prisma.FinancialInsightOrderByWithRelationInput[];
    cursor?: Prisma.FinancialInsightWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FinancialInsightCountAggregateInputType;
    _min?: FinancialInsightMinAggregateInputType;
    _max?: FinancialInsightMaxAggregateInputType;
};
export type GetFinancialInsightAggregateType<T extends FinancialInsightAggregateArgs> = {
    [P in keyof T & keyof AggregateFinancialInsight]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFinancialInsight[P]> : Prisma.GetScalarType<T[P], AggregateFinancialInsight[P]>;
};
export type FinancialInsightGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinancialInsightWhereInput;
    orderBy?: Prisma.FinancialInsightOrderByWithAggregationInput | Prisma.FinancialInsightOrderByWithAggregationInput[];
    by: Prisma.FinancialInsightScalarFieldEnum[] | Prisma.FinancialInsightScalarFieldEnum;
    having?: Prisma.FinancialInsightScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FinancialInsightCountAggregateInputType | true;
    _min?: FinancialInsightMinAggregateInputType;
    _max?: FinancialInsightMaxAggregateInputType;
};
export type FinancialInsightGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action: string | null;
    importance: $Enums.DebtPriority;
    isRead: boolean;
    createdAt: Date;
    _count: FinancialInsightCountAggregateOutputType | null;
    _min: FinancialInsightMinAggregateOutputType | null;
    _max: FinancialInsightMaxAggregateOutputType | null;
};
export type GetFinancialInsightGroupByPayload<T extends FinancialInsightGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FinancialInsightGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FinancialInsightGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FinancialInsightGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FinancialInsightGroupByOutputType[P]>;
}>>;
export type FinancialInsightWhereInput = {
    AND?: Prisma.FinancialInsightWhereInput | Prisma.FinancialInsightWhereInput[];
    OR?: Prisma.FinancialInsightWhereInput[];
    NOT?: Prisma.FinancialInsightWhereInput | Prisma.FinancialInsightWhereInput[];
    id?: Prisma.UuidFilter<"FinancialInsight"> | string;
    userId?: Prisma.UuidFilter<"FinancialInsight"> | string;
    type?: Prisma.EnumInsightTypeFilter<"FinancialInsight"> | $Enums.InsightType;
    title?: Prisma.StringFilter<"FinancialInsight"> | string;
    description?: Prisma.StringFilter<"FinancialInsight"> | string;
    action?: Prisma.StringNullableFilter<"FinancialInsight"> | string | null;
    importance?: Prisma.EnumDebtPriorityFilter<"FinancialInsight"> | $Enums.DebtPriority;
    isRead?: Prisma.BoolFilter<"FinancialInsight"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FinancialInsight"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FinancialInsightOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    action?: Prisma.SortOrderInput | Prisma.SortOrder;
    importance?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FinancialInsightWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FinancialInsightWhereInput | Prisma.FinancialInsightWhereInput[];
    OR?: Prisma.FinancialInsightWhereInput[];
    NOT?: Prisma.FinancialInsightWhereInput | Prisma.FinancialInsightWhereInput[];
    userId?: Prisma.UuidFilter<"FinancialInsight"> | string;
    type?: Prisma.EnumInsightTypeFilter<"FinancialInsight"> | $Enums.InsightType;
    title?: Prisma.StringFilter<"FinancialInsight"> | string;
    description?: Prisma.StringFilter<"FinancialInsight"> | string;
    action?: Prisma.StringNullableFilter<"FinancialInsight"> | string | null;
    importance?: Prisma.EnumDebtPriorityFilter<"FinancialInsight"> | $Enums.DebtPriority;
    isRead?: Prisma.BoolFilter<"FinancialInsight"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FinancialInsight"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type FinancialInsightOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    action?: Prisma.SortOrderInput | Prisma.SortOrder;
    importance?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FinancialInsightCountOrderByAggregateInput;
    _max?: Prisma.FinancialInsightMaxOrderByAggregateInput;
    _min?: Prisma.FinancialInsightMinOrderByAggregateInput;
};
export type FinancialInsightScalarWhereWithAggregatesInput = {
    AND?: Prisma.FinancialInsightScalarWhereWithAggregatesInput | Prisma.FinancialInsightScalarWhereWithAggregatesInput[];
    OR?: Prisma.FinancialInsightScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FinancialInsightScalarWhereWithAggregatesInput | Prisma.FinancialInsightScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"FinancialInsight"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"FinancialInsight"> | string;
    type?: Prisma.EnumInsightTypeWithAggregatesFilter<"FinancialInsight"> | $Enums.InsightType;
    title?: Prisma.StringWithAggregatesFilter<"FinancialInsight"> | string;
    description?: Prisma.StringWithAggregatesFilter<"FinancialInsight"> | string;
    action?: Prisma.StringNullableWithAggregatesFilter<"FinancialInsight"> | string | null;
    importance?: Prisma.EnumDebtPriorityWithAggregatesFilter<"FinancialInsight"> | $Enums.DebtPriority;
    isRead?: Prisma.BoolWithAggregatesFilter<"FinancialInsight"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FinancialInsight"> | Date | string;
};
export type FinancialInsightCreateInput = {
    id?: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action?: string | null;
    importance?: $Enums.DebtPriority;
    isRead?: boolean;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInsightsInput;
};
export type FinancialInsightUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action?: string | null;
    importance?: $Enums.DebtPriority;
    isRead?: boolean;
    createdAt?: Date | string;
};
export type FinancialInsightUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInsightsNestedInput;
};
export type FinancialInsightUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialInsightCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action?: string | null;
    importance?: $Enums.DebtPriority;
    isRead?: boolean;
    createdAt?: Date | string;
};
export type FinancialInsightUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialInsightUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialInsightListRelationFilter = {
    every?: Prisma.FinancialInsightWhereInput;
    some?: Prisma.FinancialInsightWhereInput;
    none?: Prisma.FinancialInsightWhereInput;
};
export type FinancialInsightOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FinancialInsightCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    importance?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FinancialInsightMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    importance?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FinancialInsightMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    importance?: Prisma.SortOrder;
    isRead?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FinancialInsightCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FinancialInsightCreateWithoutUserInput, Prisma.FinancialInsightUncheckedCreateWithoutUserInput> | Prisma.FinancialInsightCreateWithoutUserInput[] | Prisma.FinancialInsightUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancialInsightCreateOrConnectWithoutUserInput | Prisma.FinancialInsightCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FinancialInsightCreateManyUserInputEnvelope;
    connect?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
};
export type FinancialInsightUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FinancialInsightCreateWithoutUserInput, Prisma.FinancialInsightUncheckedCreateWithoutUserInput> | Prisma.FinancialInsightCreateWithoutUserInput[] | Prisma.FinancialInsightUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancialInsightCreateOrConnectWithoutUserInput | Prisma.FinancialInsightCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FinancialInsightCreateManyUserInputEnvelope;
    connect?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
};
export type FinancialInsightUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FinancialInsightCreateWithoutUserInput, Prisma.FinancialInsightUncheckedCreateWithoutUserInput> | Prisma.FinancialInsightCreateWithoutUserInput[] | Prisma.FinancialInsightUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancialInsightCreateOrConnectWithoutUserInput | Prisma.FinancialInsightCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FinancialInsightUpsertWithWhereUniqueWithoutUserInput | Prisma.FinancialInsightUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FinancialInsightCreateManyUserInputEnvelope;
    set?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    disconnect?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    delete?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    connect?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    update?: Prisma.FinancialInsightUpdateWithWhereUniqueWithoutUserInput | Prisma.FinancialInsightUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FinancialInsightUpdateManyWithWhereWithoutUserInput | Prisma.FinancialInsightUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FinancialInsightScalarWhereInput | Prisma.FinancialInsightScalarWhereInput[];
};
export type FinancialInsightUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FinancialInsightCreateWithoutUserInput, Prisma.FinancialInsightUncheckedCreateWithoutUserInput> | Prisma.FinancialInsightCreateWithoutUserInput[] | Prisma.FinancialInsightUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinancialInsightCreateOrConnectWithoutUserInput | Prisma.FinancialInsightCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FinancialInsightUpsertWithWhereUniqueWithoutUserInput | Prisma.FinancialInsightUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FinancialInsightCreateManyUserInputEnvelope;
    set?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    disconnect?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    delete?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    connect?: Prisma.FinancialInsightWhereUniqueInput | Prisma.FinancialInsightWhereUniqueInput[];
    update?: Prisma.FinancialInsightUpdateWithWhereUniqueWithoutUserInput | Prisma.FinancialInsightUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FinancialInsightUpdateManyWithWhereWithoutUserInput | Prisma.FinancialInsightUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FinancialInsightScalarWhereInput | Prisma.FinancialInsightScalarWhereInput[];
};
export type EnumInsightTypeFieldUpdateOperationsInput = {
    set?: $Enums.InsightType;
};
export type FinancialInsightCreateWithoutUserInput = {
    id?: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action?: string | null;
    importance?: $Enums.DebtPriority;
    isRead?: boolean;
    createdAt?: Date | string;
};
export type FinancialInsightUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action?: string | null;
    importance?: $Enums.DebtPriority;
    isRead?: boolean;
    createdAt?: Date | string;
};
export type FinancialInsightCreateOrConnectWithoutUserInput = {
    where: Prisma.FinancialInsightWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinancialInsightCreateWithoutUserInput, Prisma.FinancialInsightUncheckedCreateWithoutUserInput>;
};
export type FinancialInsightCreateManyUserInputEnvelope = {
    data: Prisma.FinancialInsightCreateManyUserInput | Prisma.FinancialInsightCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FinancialInsightUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FinancialInsightWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinancialInsightUpdateWithoutUserInput, Prisma.FinancialInsightUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FinancialInsightCreateWithoutUserInput, Prisma.FinancialInsightUncheckedCreateWithoutUserInput>;
};
export type FinancialInsightUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FinancialInsightWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinancialInsightUpdateWithoutUserInput, Prisma.FinancialInsightUncheckedUpdateWithoutUserInput>;
};
export type FinancialInsightUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FinancialInsightScalarWhereInput;
    data: Prisma.XOR<Prisma.FinancialInsightUpdateManyMutationInput, Prisma.FinancialInsightUncheckedUpdateManyWithoutUserInput>;
};
export type FinancialInsightScalarWhereInput = {
    AND?: Prisma.FinancialInsightScalarWhereInput | Prisma.FinancialInsightScalarWhereInput[];
    OR?: Prisma.FinancialInsightScalarWhereInput[];
    NOT?: Prisma.FinancialInsightScalarWhereInput | Prisma.FinancialInsightScalarWhereInput[];
    id?: Prisma.UuidFilter<"FinancialInsight"> | string;
    userId?: Prisma.UuidFilter<"FinancialInsight"> | string;
    type?: Prisma.EnumInsightTypeFilter<"FinancialInsight"> | $Enums.InsightType;
    title?: Prisma.StringFilter<"FinancialInsight"> | string;
    description?: Prisma.StringFilter<"FinancialInsight"> | string;
    action?: Prisma.StringNullableFilter<"FinancialInsight"> | string | null;
    importance?: Prisma.EnumDebtPriorityFilter<"FinancialInsight"> | $Enums.DebtPriority;
    isRead?: Prisma.BoolFilter<"FinancialInsight"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"FinancialInsight"> | Date | string;
};
export type FinancialInsightCreateManyUserInput = {
    id?: string;
    type: $Enums.InsightType;
    title: string;
    description: string;
    action?: string | null;
    importance?: $Enums.DebtPriority;
    isRead?: boolean;
    createdAt?: Date | string;
};
export type FinancialInsightUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialInsightUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialInsightUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumInsightTypeFieldUpdateOperationsInput | $Enums.InsightType;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    importance?: Prisma.EnumDebtPriorityFieldUpdateOperationsInput | $Enums.DebtPriority;
    isRead?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinancialInsightSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    action?: boolean;
    importance?: boolean;
    isRead?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["financialInsight"]>;
export type FinancialInsightSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    action?: boolean;
    importance?: boolean;
    isRead?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["financialInsight"]>;
export type FinancialInsightSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    action?: boolean;
    importance?: boolean;
    isRead?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["financialInsight"]>;
export type FinancialInsightSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    title?: boolean;
    description?: boolean;
    action?: boolean;
    importance?: boolean;
    isRead?: boolean;
    createdAt?: boolean;
};
export type FinancialInsightOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "title" | "description" | "action" | "importance" | "isRead" | "createdAt", ExtArgs["result"]["financialInsight"]>;
export type FinancialInsightInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FinancialInsightIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FinancialInsightIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FinancialInsightPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FinancialInsight";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.InsightType;
        title: string;
        description: string;
        action: string | null;
        importance: $Enums.DebtPriority;
        isRead: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["financialInsight"]>;
    composites: {};
};
export type FinancialInsightGetPayload<S extends boolean | null | undefined | FinancialInsightDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload, S>;
export type FinancialInsightCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FinancialInsightFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FinancialInsightCountAggregateInputType | true;
};
export interface FinancialInsightDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FinancialInsight'];
        meta: {
            name: 'FinancialInsight';
        };
    };
    findUnique<T extends FinancialInsightFindUniqueArgs>(args: Prisma.SelectSubset<T, FinancialInsightFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FinancialInsightFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FinancialInsightFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FinancialInsightFindFirstArgs>(args?: Prisma.SelectSubset<T, FinancialInsightFindFirstArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FinancialInsightFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FinancialInsightFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FinancialInsightFindManyArgs>(args?: Prisma.SelectSubset<T, FinancialInsightFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FinancialInsightCreateArgs>(args: Prisma.SelectSubset<T, FinancialInsightCreateArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FinancialInsightCreateManyArgs>(args?: Prisma.SelectSubset<T, FinancialInsightCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FinancialInsightCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FinancialInsightCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FinancialInsightDeleteArgs>(args: Prisma.SelectSubset<T, FinancialInsightDeleteArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FinancialInsightUpdateArgs>(args: Prisma.SelectSubset<T, FinancialInsightUpdateArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FinancialInsightDeleteManyArgs>(args?: Prisma.SelectSubset<T, FinancialInsightDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FinancialInsightUpdateManyArgs>(args: Prisma.SelectSubset<T, FinancialInsightUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FinancialInsightUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FinancialInsightUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FinancialInsightUpsertArgs>(args: Prisma.SelectSubset<T, FinancialInsightUpsertArgs<ExtArgs>>): Prisma.Prisma__FinancialInsightClient<runtime.Types.Result.GetResult<Prisma.$FinancialInsightPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FinancialInsightCountArgs>(args?: Prisma.Subset<T, FinancialInsightCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FinancialInsightCountAggregateOutputType> : number>;
    aggregate<T extends FinancialInsightAggregateArgs>(args: Prisma.Subset<T, FinancialInsightAggregateArgs>): Prisma.PrismaPromise<GetFinancialInsightAggregateType<T>>;
    groupBy<T extends FinancialInsightGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FinancialInsightGroupByArgs['orderBy'];
    } : {
        orderBy?: FinancialInsightGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FinancialInsightGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinancialInsightGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FinancialInsightFieldRefs;
}
export interface Prisma__FinancialInsightClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FinancialInsightFieldRefs {
    readonly id: Prisma.FieldRef<"FinancialInsight", 'String'>;
    readonly userId: Prisma.FieldRef<"FinancialInsight", 'String'>;
    readonly type: Prisma.FieldRef<"FinancialInsight", 'InsightType'>;
    readonly title: Prisma.FieldRef<"FinancialInsight", 'String'>;
    readonly description: Prisma.FieldRef<"FinancialInsight", 'String'>;
    readonly action: Prisma.FieldRef<"FinancialInsight", 'String'>;
    readonly importance: Prisma.FieldRef<"FinancialInsight", 'DebtPriority'>;
    readonly isRead: Prisma.FieldRef<"FinancialInsight", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"FinancialInsight", 'DateTime'>;
}
export type FinancialInsightFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where: Prisma.FinancialInsightWhereUniqueInput;
};
export type FinancialInsightFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where: Prisma.FinancialInsightWhereUniqueInput;
};
export type FinancialInsightFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where?: Prisma.FinancialInsightWhereInput;
    orderBy?: Prisma.FinancialInsightOrderByWithRelationInput | Prisma.FinancialInsightOrderByWithRelationInput[];
    cursor?: Prisma.FinancialInsightWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinancialInsightScalarFieldEnum | Prisma.FinancialInsightScalarFieldEnum[];
};
export type FinancialInsightFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where?: Prisma.FinancialInsightWhereInput;
    orderBy?: Prisma.FinancialInsightOrderByWithRelationInput | Prisma.FinancialInsightOrderByWithRelationInput[];
    cursor?: Prisma.FinancialInsightWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinancialInsightScalarFieldEnum | Prisma.FinancialInsightScalarFieldEnum[];
};
export type FinancialInsightFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where?: Prisma.FinancialInsightWhereInput;
    orderBy?: Prisma.FinancialInsightOrderByWithRelationInput | Prisma.FinancialInsightOrderByWithRelationInput[];
    cursor?: Prisma.FinancialInsightWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinancialInsightScalarFieldEnum | Prisma.FinancialInsightScalarFieldEnum[];
};
export type FinancialInsightCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinancialInsightCreateInput, Prisma.FinancialInsightUncheckedCreateInput>;
};
export type FinancialInsightCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FinancialInsightCreateManyInput | Prisma.FinancialInsightCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FinancialInsightCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    data: Prisma.FinancialInsightCreateManyInput | Prisma.FinancialInsightCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FinancialInsightIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FinancialInsightUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinancialInsightUpdateInput, Prisma.FinancialInsightUncheckedUpdateInput>;
    where: Prisma.FinancialInsightWhereUniqueInput;
};
export type FinancialInsightUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FinancialInsightUpdateManyMutationInput, Prisma.FinancialInsightUncheckedUpdateManyInput>;
    where?: Prisma.FinancialInsightWhereInput;
    limit?: number;
};
export type FinancialInsightUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinancialInsightUpdateManyMutationInput, Prisma.FinancialInsightUncheckedUpdateManyInput>;
    where?: Prisma.FinancialInsightWhereInput;
    limit?: number;
    include?: Prisma.FinancialInsightIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FinancialInsightUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where: Prisma.FinancialInsightWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinancialInsightCreateInput, Prisma.FinancialInsightUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FinancialInsightUpdateInput, Prisma.FinancialInsightUncheckedUpdateInput>;
};
export type FinancialInsightDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
    where: Prisma.FinancialInsightWhereUniqueInput;
};
export type FinancialInsightDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinancialInsightWhereInput;
    limit?: number;
};
export type FinancialInsightDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinancialInsightSelect<ExtArgs> | null;
    omit?: Prisma.FinancialInsightOmit<ExtArgs> | null;
    include?: Prisma.FinancialInsightInclude<ExtArgs> | null;
};
