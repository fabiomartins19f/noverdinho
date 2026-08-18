import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PushDeviceModel = runtime.Types.Result.DefaultSelection<Prisma.$PushDevicePayload>;
export type AggregatePushDevice = {
    _count: PushDeviceCountAggregateOutputType | null;
    _min: PushDeviceMinAggregateOutputType | null;
    _max: PushDeviceMaxAggregateOutputType | null;
};
export type PushDeviceMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    token: string | null;
    platform: string | null;
    apnsTopic: string | null;
    lastSeenAt: Date | null;
    createdAt: Date | null;
};
export type PushDeviceMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    token: string | null;
    platform: string | null;
    apnsTopic: string | null;
    lastSeenAt: Date | null;
    createdAt: Date | null;
};
export type PushDeviceCountAggregateOutputType = {
    id: number;
    userId: number;
    token: number;
    platform: number;
    apnsTopic: number;
    lastSeenAt: number;
    createdAt: number;
    _all: number;
};
export type PushDeviceMinAggregateInputType = {
    id?: true;
    userId?: true;
    token?: true;
    platform?: true;
    apnsTopic?: true;
    lastSeenAt?: true;
    createdAt?: true;
};
export type PushDeviceMaxAggregateInputType = {
    id?: true;
    userId?: true;
    token?: true;
    platform?: true;
    apnsTopic?: true;
    lastSeenAt?: true;
    createdAt?: true;
};
export type PushDeviceCountAggregateInputType = {
    id?: true;
    userId?: true;
    token?: true;
    platform?: true;
    apnsTopic?: true;
    lastSeenAt?: true;
    createdAt?: true;
    _all?: true;
};
export type PushDeviceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PushDeviceWhereInput;
    orderBy?: Prisma.PushDeviceOrderByWithRelationInput | Prisma.PushDeviceOrderByWithRelationInput[];
    cursor?: Prisma.PushDeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PushDeviceCountAggregateInputType;
    _min?: PushDeviceMinAggregateInputType;
    _max?: PushDeviceMaxAggregateInputType;
};
export type GetPushDeviceAggregateType<T extends PushDeviceAggregateArgs> = {
    [P in keyof T & keyof AggregatePushDevice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePushDevice[P]> : Prisma.GetScalarType<T[P], AggregatePushDevice[P]>;
};
export type PushDeviceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PushDeviceWhereInput;
    orderBy?: Prisma.PushDeviceOrderByWithAggregationInput | Prisma.PushDeviceOrderByWithAggregationInput[];
    by: Prisma.PushDeviceScalarFieldEnum[] | Prisma.PushDeviceScalarFieldEnum;
    having?: Prisma.PushDeviceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PushDeviceCountAggregateInputType | true;
    _min?: PushDeviceMinAggregateInputType;
    _max?: PushDeviceMaxAggregateInputType;
};
export type PushDeviceGroupByOutputType = {
    id: string;
    userId: string;
    token: string;
    platform: string;
    apnsTopic: string | null;
    lastSeenAt: Date;
    createdAt: Date;
    _count: PushDeviceCountAggregateOutputType | null;
    _min: PushDeviceMinAggregateOutputType | null;
    _max: PushDeviceMaxAggregateOutputType | null;
};
export type GetPushDeviceGroupByPayload<T extends PushDeviceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PushDeviceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PushDeviceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PushDeviceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PushDeviceGroupByOutputType[P]>;
}>>;
export type PushDeviceWhereInput = {
    AND?: Prisma.PushDeviceWhereInput | Prisma.PushDeviceWhereInput[];
    OR?: Prisma.PushDeviceWhereInput[];
    NOT?: Prisma.PushDeviceWhereInput | Prisma.PushDeviceWhereInput[];
    id?: Prisma.UuidFilter<"PushDevice"> | string;
    userId?: Prisma.UuidFilter<"PushDevice"> | string;
    token?: Prisma.StringFilter<"PushDevice"> | string;
    platform?: Prisma.StringFilter<"PushDevice"> | string;
    apnsTopic?: Prisma.StringNullableFilter<"PushDevice"> | string | null;
    lastSeenAt?: Prisma.DateTimeFilter<"PushDevice"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PushDevice"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PushDeviceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    apnsTopic?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PushDeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    token?: string;
    AND?: Prisma.PushDeviceWhereInput | Prisma.PushDeviceWhereInput[];
    OR?: Prisma.PushDeviceWhereInput[];
    NOT?: Prisma.PushDeviceWhereInput | Prisma.PushDeviceWhereInput[];
    userId?: Prisma.UuidFilter<"PushDevice"> | string;
    platform?: Prisma.StringFilter<"PushDevice"> | string;
    apnsTopic?: Prisma.StringNullableFilter<"PushDevice"> | string | null;
    lastSeenAt?: Prisma.DateTimeFilter<"PushDevice"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PushDevice"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "token">;
export type PushDeviceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    apnsTopic?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PushDeviceCountOrderByAggregateInput;
    _max?: Prisma.PushDeviceMaxOrderByAggregateInput;
    _min?: Prisma.PushDeviceMinOrderByAggregateInput;
};
export type PushDeviceScalarWhereWithAggregatesInput = {
    AND?: Prisma.PushDeviceScalarWhereWithAggregatesInput | Prisma.PushDeviceScalarWhereWithAggregatesInput[];
    OR?: Prisma.PushDeviceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PushDeviceScalarWhereWithAggregatesInput | Prisma.PushDeviceScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PushDevice"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"PushDevice"> | string;
    token?: Prisma.StringWithAggregatesFilter<"PushDevice"> | string;
    platform?: Prisma.StringWithAggregatesFilter<"PushDevice"> | string;
    apnsTopic?: Prisma.StringNullableWithAggregatesFilter<"PushDevice"> | string | null;
    lastSeenAt?: Prisma.DateTimeWithAggregatesFilter<"PushDevice"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PushDevice"> | Date | string;
};
export type PushDeviceCreateInput = {
    id?: string;
    token: string;
    platform?: string;
    apnsTopic?: string | null;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPushDevicesInput;
};
export type PushDeviceUncheckedCreateInput = {
    id?: string;
    userId: string;
    token: string;
    platform?: string;
    apnsTopic?: string | null;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushDeviceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPushDevicesNestedInput;
};
export type PushDeviceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushDeviceCreateManyInput = {
    id?: string;
    userId: string;
    token: string;
    platform?: string;
    apnsTopic?: string | null;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushDeviceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushDeviceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushDeviceListRelationFilter = {
    every?: Prisma.PushDeviceWhereInput;
    some?: Prisma.PushDeviceWhereInput;
    none?: Prisma.PushDeviceWhereInput;
};
export type PushDeviceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PushDeviceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    apnsTopic?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PushDeviceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    apnsTopic?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PushDeviceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    token?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    apnsTopic?: Prisma.SortOrder;
    lastSeenAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PushDeviceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PushDeviceCreateWithoutUserInput, Prisma.PushDeviceUncheckedCreateWithoutUserInput> | Prisma.PushDeviceCreateWithoutUserInput[] | Prisma.PushDeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PushDeviceCreateOrConnectWithoutUserInput | Prisma.PushDeviceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PushDeviceCreateManyUserInputEnvelope;
    connect?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
};
export type PushDeviceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PushDeviceCreateWithoutUserInput, Prisma.PushDeviceUncheckedCreateWithoutUserInput> | Prisma.PushDeviceCreateWithoutUserInput[] | Prisma.PushDeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PushDeviceCreateOrConnectWithoutUserInput | Prisma.PushDeviceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PushDeviceCreateManyUserInputEnvelope;
    connect?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
};
export type PushDeviceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PushDeviceCreateWithoutUserInput, Prisma.PushDeviceUncheckedCreateWithoutUserInput> | Prisma.PushDeviceCreateWithoutUserInput[] | Prisma.PushDeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PushDeviceCreateOrConnectWithoutUserInput | Prisma.PushDeviceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PushDeviceUpsertWithWhereUniqueWithoutUserInput | Prisma.PushDeviceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PushDeviceCreateManyUserInputEnvelope;
    set?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    disconnect?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    delete?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    connect?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    update?: Prisma.PushDeviceUpdateWithWhereUniqueWithoutUserInput | Prisma.PushDeviceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PushDeviceUpdateManyWithWhereWithoutUserInput | Prisma.PushDeviceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PushDeviceScalarWhereInput | Prisma.PushDeviceScalarWhereInput[];
};
export type PushDeviceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PushDeviceCreateWithoutUserInput, Prisma.PushDeviceUncheckedCreateWithoutUserInput> | Prisma.PushDeviceCreateWithoutUserInput[] | Prisma.PushDeviceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PushDeviceCreateOrConnectWithoutUserInput | Prisma.PushDeviceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PushDeviceUpsertWithWhereUniqueWithoutUserInput | Prisma.PushDeviceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PushDeviceCreateManyUserInputEnvelope;
    set?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    disconnect?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    delete?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    connect?: Prisma.PushDeviceWhereUniqueInput | Prisma.PushDeviceWhereUniqueInput[];
    update?: Prisma.PushDeviceUpdateWithWhereUniqueWithoutUserInput | Prisma.PushDeviceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PushDeviceUpdateManyWithWhereWithoutUserInput | Prisma.PushDeviceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PushDeviceScalarWhereInput | Prisma.PushDeviceScalarWhereInput[];
};
export type PushDeviceCreateWithoutUserInput = {
    id?: string;
    token: string;
    platform?: string;
    apnsTopic?: string | null;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushDeviceUncheckedCreateWithoutUserInput = {
    id?: string;
    token: string;
    platform?: string;
    apnsTopic?: string | null;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushDeviceCreateOrConnectWithoutUserInput = {
    where: Prisma.PushDeviceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PushDeviceCreateWithoutUserInput, Prisma.PushDeviceUncheckedCreateWithoutUserInput>;
};
export type PushDeviceCreateManyUserInputEnvelope = {
    data: Prisma.PushDeviceCreateManyUserInput | Prisma.PushDeviceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PushDeviceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PushDeviceWhereUniqueInput;
    update: Prisma.XOR<Prisma.PushDeviceUpdateWithoutUserInput, Prisma.PushDeviceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PushDeviceCreateWithoutUserInput, Prisma.PushDeviceUncheckedCreateWithoutUserInput>;
};
export type PushDeviceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PushDeviceWhereUniqueInput;
    data: Prisma.XOR<Prisma.PushDeviceUpdateWithoutUserInput, Prisma.PushDeviceUncheckedUpdateWithoutUserInput>;
};
export type PushDeviceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PushDeviceScalarWhereInput;
    data: Prisma.XOR<Prisma.PushDeviceUpdateManyMutationInput, Prisma.PushDeviceUncheckedUpdateManyWithoutUserInput>;
};
export type PushDeviceScalarWhereInput = {
    AND?: Prisma.PushDeviceScalarWhereInput | Prisma.PushDeviceScalarWhereInput[];
    OR?: Prisma.PushDeviceScalarWhereInput[];
    NOT?: Prisma.PushDeviceScalarWhereInput | Prisma.PushDeviceScalarWhereInput[];
    id?: Prisma.UuidFilter<"PushDevice"> | string;
    userId?: Prisma.UuidFilter<"PushDevice"> | string;
    token?: Prisma.StringFilter<"PushDevice"> | string;
    platform?: Prisma.StringFilter<"PushDevice"> | string;
    apnsTopic?: Prisma.StringNullableFilter<"PushDevice"> | string | null;
    lastSeenAt?: Prisma.DateTimeFilter<"PushDevice"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"PushDevice"> | Date | string;
};
export type PushDeviceCreateManyUserInput = {
    id?: string;
    token: string;
    platform?: string;
    apnsTopic?: string | null;
    lastSeenAt?: Date | string;
    createdAt?: Date | string;
};
export type PushDeviceUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushDeviceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushDeviceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    token?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.StringFieldUpdateOperationsInput | string;
    apnsTopic?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastSeenAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PushDeviceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    token?: boolean;
    platform?: boolean;
    apnsTopic?: boolean;
    lastSeenAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pushDevice"]>;
export type PushDeviceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    token?: boolean;
    platform?: boolean;
    apnsTopic?: boolean;
    lastSeenAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pushDevice"]>;
export type PushDeviceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    token?: boolean;
    platform?: boolean;
    apnsTopic?: boolean;
    lastSeenAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pushDevice"]>;
export type PushDeviceSelectScalar = {
    id?: boolean;
    userId?: boolean;
    token?: boolean;
    platform?: boolean;
    apnsTopic?: boolean;
    lastSeenAt?: boolean;
    createdAt?: boolean;
};
export type PushDeviceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "token" | "platform" | "apnsTopic" | "lastSeenAt" | "createdAt", ExtArgs["result"]["pushDevice"]>;
export type PushDeviceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PushDeviceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PushDeviceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PushDevicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PushDevice";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        token: string;
        platform: string;
        apnsTopic: string | null;
        lastSeenAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["pushDevice"]>;
    composites: {};
};
export type PushDeviceGetPayload<S extends boolean | null | undefined | PushDeviceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PushDevicePayload, S>;
export type PushDeviceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PushDeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PushDeviceCountAggregateInputType | true;
};
export interface PushDeviceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PushDevice'];
        meta: {
            name: 'PushDevice';
        };
    };
    findUnique<T extends PushDeviceFindUniqueArgs>(args: Prisma.SelectSubset<T, PushDeviceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PushDeviceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PushDeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PushDeviceFindFirstArgs>(args?: Prisma.SelectSubset<T, PushDeviceFindFirstArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PushDeviceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PushDeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PushDeviceFindManyArgs>(args?: Prisma.SelectSubset<T, PushDeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PushDeviceCreateArgs>(args: Prisma.SelectSubset<T, PushDeviceCreateArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PushDeviceCreateManyArgs>(args?: Prisma.SelectSubset<T, PushDeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PushDeviceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PushDeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PushDeviceDeleteArgs>(args: Prisma.SelectSubset<T, PushDeviceDeleteArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PushDeviceUpdateArgs>(args: Prisma.SelectSubset<T, PushDeviceUpdateArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PushDeviceDeleteManyArgs>(args?: Prisma.SelectSubset<T, PushDeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PushDeviceUpdateManyArgs>(args: Prisma.SelectSubset<T, PushDeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PushDeviceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PushDeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PushDeviceUpsertArgs>(args: Prisma.SelectSubset<T, PushDeviceUpsertArgs<ExtArgs>>): Prisma.Prisma__PushDeviceClient<runtime.Types.Result.GetResult<Prisma.$PushDevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PushDeviceCountArgs>(args?: Prisma.Subset<T, PushDeviceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PushDeviceCountAggregateOutputType> : number>;
    aggregate<T extends PushDeviceAggregateArgs>(args: Prisma.Subset<T, PushDeviceAggregateArgs>): Prisma.PrismaPromise<GetPushDeviceAggregateType<T>>;
    groupBy<T extends PushDeviceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PushDeviceGroupByArgs['orderBy'];
    } : {
        orderBy?: PushDeviceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PushDeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPushDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PushDeviceFieldRefs;
}
export interface Prisma__PushDeviceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PushDeviceFieldRefs {
    readonly id: Prisma.FieldRef<"PushDevice", 'String'>;
    readonly userId: Prisma.FieldRef<"PushDevice", 'String'>;
    readonly token: Prisma.FieldRef<"PushDevice", 'String'>;
    readonly platform: Prisma.FieldRef<"PushDevice", 'String'>;
    readonly apnsTopic: Prisma.FieldRef<"PushDevice", 'String'>;
    readonly lastSeenAt: Prisma.FieldRef<"PushDevice", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PushDevice", 'DateTime'>;
}
export type PushDeviceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where: Prisma.PushDeviceWhereUniqueInput;
};
export type PushDeviceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where: Prisma.PushDeviceWhereUniqueInput;
};
export type PushDeviceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where?: Prisma.PushDeviceWhereInput;
    orderBy?: Prisma.PushDeviceOrderByWithRelationInput | Prisma.PushDeviceOrderByWithRelationInput[];
    cursor?: Prisma.PushDeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PushDeviceScalarFieldEnum | Prisma.PushDeviceScalarFieldEnum[];
};
export type PushDeviceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where?: Prisma.PushDeviceWhereInput;
    orderBy?: Prisma.PushDeviceOrderByWithRelationInput | Prisma.PushDeviceOrderByWithRelationInput[];
    cursor?: Prisma.PushDeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PushDeviceScalarFieldEnum | Prisma.PushDeviceScalarFieldEnum[];
};
export type PushDeviceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where?: Prisma.PushDeviceWhereInput;
    orderBy?: Prisma.PushDeviceOrderByWithRelationInput | Prisma.PushDeviceOrderByWithRelationInput[];
    cursor?: Prisma.PushDeviceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PushDeviceScalarFieldEnum | Prisma.PushDeviceScalarFieldEnum[];
};
export type PushDeviceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PushDeviceCreateInput, Prisma.PushDeviceUncheckedCreateInput>;
};
export type PushDeviceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PushDeviceCreateManyInput | Prisma.PushDeviceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PushDeviceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    data: Prisma.PushDeviceCreateManyInput | Prisma.PushDeviceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PushDeviceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PushDeviceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PushDeviceUpdateInput, Prisma.PushDeviceUncheckedUpdateInput>;
    where: Prisma.PushDeviceWhereUniqueInput;
};
export type PushDeviceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PushDeviceUpdateManyMutationInput, Prisma.PushDeviceUncheckedUpdateManyInput>;
    where?: Prisma.PushDeviceWhereInput;
    limit?: number;
};
export type PushDeviceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PushDeviceUpdateManyMutationInput, Prisma.PushDeviceUncheckedUpdateManyInput>;
    where?: Prisma.PushDeviceWhereInput;
    limit?: number;
    include?: Prisma.PushDeviceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PushDeviceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where: Prisma.PushDeviceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PushDeviceCreateInput, Prisma.PushDeviceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PushDeviceUpdateInput, Prisma.PushDeviceUncheckedUpdateInput>;
};
export type PushDeviceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
    where: Prisma.PushDeviceWhereUniqueInput;
};
export type PushDeviceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PushDeviceWhereInput;
    limit?: number;
};
export type PushDeviceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PushDeviceSelect<ExtArgs> | null;
    omit?: Prisma.PushDeviceOmit<ExtArgs> | null;
    include?: Prisma.PushDeviceInclude<ExtArgs> | null;
};
