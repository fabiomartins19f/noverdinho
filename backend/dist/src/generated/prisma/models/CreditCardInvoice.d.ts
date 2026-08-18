import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type CreditCardInvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$CreditCardInvoicePayload>;
export type AggregateCreditCardInvoice = {
    _count: CreditCardInvoiceCountAggregateOutputType | null;
    _avg: CreditCardInvoiceAvgAggregateOutputType | null;
    _sum: CreditCardInvoiceSumAggregateOutputType | null;
    _min: CreditCardInvoiceMinAggregateOutputType | null;
    _max: CreditCardInvoiceMaxAggregateOutputType | null;
};
export type CreditCardInvoiceAvgAggregateOutputType = {
    referenceMonth: number | null;
    referenceYear: number | null;
    amount: runtime.Decimal | null;
};
export type CreditCardInvoiceSumAggregateOutputType = {
    referenceMonth: number | null;
    referenceYear: number | null;
    amount: runtime.Decimal | null;
};
export type CreditCardInvoiceMinAggregateOutputType = {
    id: string | null;
    cardId: string | null;
    userId: string | null;
    referenceMonth: number | null;
    referenceYear: number | null;
    closingDate: Date | null;
    dueDate: Date | null;
    amount: runtime.Decimal | null;
    status: $Enums.InvoiceStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardInvoiceMaxAggregateOutputType = {
    id: string | null;
    cardId: string | null;
    userId: string | null;
    referenceMonth: number | null;
    referenceYear: number | null;
    closingDate: Date | null;
    dueDate: Date | null;
    amount: runtime.Decimal | null;
    status: $Enums.InvoiceStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardInvoiceCountAggregateOutputType = {
    id: number;
    cardId: number;
    userId: number;
    referenceMonth: number;
    referenceYear: number;
    closingDate: number;
    dueDate: number;
    amount: number;
    status: number;
    paidAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CreditCardInvoiceAvgAggregateInputType = {
    referenceMonth?: true;
    referenceYear?: true;
    amount?: true;
};
export type CreditCardInvoiceSumAggregateInputType = {
    referenceMonth?: true;
    referenceYear?: true;
    amount?: true;
};
export type CreditCardInvoiceMinAggregateInputType = {
    id?: true;
    cardId?: true;
    userId?: true;
    referenceMonth?: true;
    referenceYear?: true;
    closingDate?: true;
    dueDate?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardInvoiceMaxAggregateInputType = {
    id?: true;
    cardId?: true;
    userId?: true;
    referenceMonth?: true;
    referenceYear?: true;
    closingDate?: true;
    dueDate?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardInvoiceCountAggregateInputType = {
    id?: true;
    cardId?: true;
    userId?: true;
    referenceMonth?: true;
    referenceYear?: true;
    closingDate?: true;
    dueDate?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CreditCardInvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInvoiceWhereInput;
    orderBy?: Prisma.CreditCardInvoiceOrderByWithRelationInput | Prisma.CreditCardInvoiceOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardInvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CreditCardInvoiceCountAggregateInputType;
    _avg?: CreditCardInvoiceAvgAggregateInputType;
    _sum?: CreditCardInvoiceSumAggregateInputType;
    _min?: CreditCardInvoiceMinAggregateInputType;
    _max?: CreditCardInvoiceMaxAggregateInputType;
};
export type GetCreditCardInvoiceAggregateType<T extends CreditCardInvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregateCreditCardInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCreditCardInvoice[P]> : Prisma.GetScalarType<T[P], AggregateCreditCardInvoice[P]>;
};
export type CreditCardInvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInvoiceWhereInput;
    orderBy?: Prisma.CreditCardInvoiceOrderByWithAggregationInput | Prisma.CreditCardInvoiceOrderByWithAggregationInput[];
    by: Prisma.CreditCardInvoiceScalarFieldEnum[] | Prisma.CreditCardInvoiceScalarFieldEnum;
    having?: Prisma.CreditCardInvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CreditCardInvoiceCountAggregateInputType | true;
    _avg?: CreditCardInvoiceAvgAggregateInputType;
    _sum?: CreditCardInvoiceSumAggregateInputType;
    _min?: CreditCardInvoiceMinAggregateInputType;
    _max?: CreditCardInvoiceMaxAggregateInputType;
};
export type CreditCardInvoiceGroupByOutputType = {
    id: string;
    cardId: string;
    userId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date;
    dueDate: Date;
    amount: runtime.Decimal;
    status: $Enums.InvoiceStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CreditCardInvoiceCountAggregateOutputType | null;
    _avg: CreditCardInvoiceAvgAggregateOutputType | null;
    _sum: CreditCardInvoiceSumAggregateOutputType | null;
    _min: CreditCardInvoiceMinAggregateOutputType | null;
    _max: CreditCardInvoiceMaxAggregateOutputType | null;
};
export type GetCreditCardInvoiceGroupByPayload<T extends CreditCardInvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CreditCardInvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CreditCardInvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CreditCardInvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CreditCardInvoiceGroupByOutputType[P]>;
}>>;
export type CreditCardInvoiceWhereInput = {
    AND?: Prisma.CreditCardInvoiceWhereInput | Prisma.CreditCardInvoiceWhereInput[];
    OR?: Prisma.CreditCardInvoiceWhereInput[];
    NOT?: Prisma.CreditCardInvoiceWhereInput | Prisma.CreditCardInvoiceWhereInput[];
    id?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    userId?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    referenceMonth?: Prisma.IntFilter<"CreditCardInvoice"> | number;
    referenceYear?: Prisma.IntFilter<"CreditCardInvoice"> | number;
    closingDate?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    dueDate?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    amount?: Prisma.DecimalFilter<"CreditCardInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFilter<"CreditCardInvoice"> | $Enums.InvoiceStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"CreditCardInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    card?: Prisma.XOR<Prisma.CreditCardScalarRelationFilter, Prisma.CreditCardWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    installments?: Prisma.CreditCardInstallmentListRelationFilter;
};
export type CreditCardInvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    closingDate?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    card?: Prisma.CreditCardOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    installments?: Prisma.CreditCardInstallmentOrderByRelationAggregateInput;
};
export type CreditCardInvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    cardId_referenceMonth_referenceYear?: Prisma.CreditCardInvoiceCardIdReferenceMonthReferenceYearCompoundUniqueInput;
    AND?: Prisma.CreditCardInvoiceWhereInput | Prisma.CreditCardInvoiceWhereInput[];
    OR?: Prisma.CreditCardInvoiceWhereInput[];
    NOT?: Prisma.CreditCardInvoiceWhereInput | Prisma.CreditCardInvoiceWhereInput[];
    cardId?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    userId?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    referenceMonth?: Prisma.IntFilter<"CreditCardInvoice"> | number;
    referenceYear?: Prisma.IntFilter<"CreditCardInvoice"> | number;
    closingDate?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    dueDate?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    amount?: Prisma.DecimalFilter<"CreditCardInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFilter<"CreditCardInvoice"> | $Enums.InvoiceStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"CreditCardInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    card?: Prisma.XOR<Prisma.CreditCardScalarRelationFilter, Prisma.CreditCardWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    installments?: Prisma.CreditCardInstallmentListRelationFilter;
}, "id" | "cardId_referenceMonth_referenceYear">;
export type CreditCardInvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    closingDate?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CreditCardInvoiceCountOrderByAggregateInput;
    _avg?: Prisma.CreditCardInvoiceAvgOrderByAggregateInput;
    _max?: Prisma.CreditCardInvoiceMaxOrderByAggregateInput;
    _min?: Prisma.CreditCardInvoiceMinOrderByAggregateInput;
    _sum?: Prisma.CreditCardInvoiceSumOrderByAggregateInput;
};
export type CreditCardInvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.CreditCardInvoiceScalarWhereWithAggregatesInput | Prisma.CreditCardInvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.CreditCardInvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CreditCardInvoiceScalarWhereWithAggregatesInput | Prisma.CreditCardInvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"CreditCardInvoice"> | string;
    cardId?: Prisma.UuidWithAggregatesFilter<"CreditCardInvoice"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"CreditCardInvoice"> | string;
    referenceMonth?: Prisma.IntWithAggregatesFilter<"CreditCardInvoice"> | number;
    referenceYear?: Prisma.IntWithAggregatesFilter<"CreditCardInvoice"> | number;
    closingDate?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInvoice"> | Date | string;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInvoice"> | Date | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"CreditCardInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusWithAggregatesFilter<"CreditCardInvoice"> | $Enums.InvoiceStatus;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CreditCardInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardInvoice"> | Date | string;
};
export type CreditCardInvoiceCreateInput = {
    id?: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutInvoicesInput;
    user: Prisma.UserCreateNestedOneWithoutInvoicesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutInvoiceInput;
};
export type CreditCardInvoiceUncheckedCreateInput = {
    id?: string;
    cardId: string;
    userId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type CreditCardInvoiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInvoicesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutInvoiceNestedInput;
};
export type CreditCardInvoiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type CreditCardInvoiceCreateManyInput = {
    id?: string;
    cardId: string;
    userId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInvoiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInvoiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInvoiceListRelationFilter = {
    every?: Prisma.CreditCardInvoiceWhereInput;
    some?: Prisma.CreditCardInvoiceWhereInput;
    none?: Prisma.CreditCardInvoiceWhereInput;
};
export type CreditCardInvoiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CreditCardInvoiceCardIdReferenceMonthReferenceYearCompoundUniqueInput = {
    cardId: string;
    referenceMonth: number;
    referenceYear: number;
};
export type CreditCardInvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    closingDate?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardInvoiceAvgOrderByAggregateInput = {
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CreditCardInvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    closingDate?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardInvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    cardId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    closingDate?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardInvoiceSumOrderByAggregateInput = {
    referenceMonth?: Prisma.SortOrder;
    referenceYear?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type CreditCardInvoiceNullableScalarRelationFilter = {
    is?: Prisma.CreditCardInvoiceWhereInput | null;
    isNot?: Prisma.CreditCardInvoiceWhereInput | null;
};
export type CreditCardInvoiceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput> | Prisma.CreditCardInvoiceCreateWithoutUserInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
};
export type CreditCardInvoiceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput> | Prisma.CreditCardInvoiceCreateWithoutUserInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyUserInputEnvelope;
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
};
export type CreditCardInvoiceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput> | Prisma.CreditCardInvoiceCreateWithoutUserInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    delete?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    update?: Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardInvoiceScalarWhereInput | Prisma.CreditCardInvoiceScalarWhereInput[];
};
export type CreditCardInvoiceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput> | Prisma.CreditCardInvoiceCreateWithoutUserInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutUserInput | Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyUserInputEnvelope;
    set?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    delete?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    update?: Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutUserInput | Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutUserInput | Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.CreditCardInvoiceScalarWhereInput | Prisma.CreditCardInvoiceScalarWhereInput[];
};
export type CreditCardInvoiceCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput> | Prisma.CreditCardInvoiceCreateWithoutCardInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyCardInputEnvelope;
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
};
export type CreditCardInvoiceUncheckedCreateNestedManyWithoutCardInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput> | Prisma.CreditCardInvoiceCreateWithoutCardInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyCardInputEnvelope;
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
};
export type CreditCardInvoiceUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput> | Prisma.CreditCardInvoiceCreateWithoutCardInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutCardInput | Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyCardInputEnvelope;
    set?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    delete?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    update?: Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutCardInput | Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutCardInput | Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CreditCardInvoiceScalarWhereInput | Prisma.CreditCardInvoiceScalarWhereInput[];
};
export type CreditCardInvoiceUncheckedUpdateManyWithoutCardNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput> | Prisma.CreditCardInvoiceCreateWithoutCardInput[] | Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput[];
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput | Prisma.CreditCardInvoiceCreateOrConnectWithoutCardInput[];
    upsert?: Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutCardInput | Prisma.CreditCardInvoiceUpsertWithWhereUniqueWithoutCardInput[];
    createMany?: Prisma.CreditCardInvoiceCreateManyCardInputEnvelope;
    set?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    disconnect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    delete?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput | Prisma.CreditCardInvoiceWhereUniqueInput[];
    update?: Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutCardInput | Prisma.CreditCardInvoiceUpdateWithWhereUniqueWithoutCardInput[];
    updateMany?: Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutCardInput | Prisma.CreditCardInvoiceUpdateManyWithWhereWithoutCardInput[];
    deleteMany?: Prisma.CreditCardInvoiceScalarWhereInput | Prisma.CreditCardInvoiceScalarWhereInput[];
};
export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus;
};
export type CreditCardInvoiceCreateNestedOneWithoutInstallmentsInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutInstallmentsInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutInstallmentsInput>;
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutInstallmentsInput;
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput;
};
export type CreditCardInvoiceUpdateOneWithoutInstallmentsNestedInput = {
    create?: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutInstallmentsInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutInstallmentsInput>;
    connectOrCreate?: Prisma.CreditCardInvoiceCreateOrConnectWithoutInstallmentsInput;
    upsert?: Prisma.CreditCardInvoiceUpsertWithoutInstallmentsInput;
    disconnect?: Prisma.CreditCardInvoiceWhereInput | boolean;
    delete?: Prisma.CreditCardInvoiceWhereInput | boolean;
    connect?: Prisma.CreditCardInvoiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CreditCardInvoiceUpdateToOneWithWhereWithoutInstallmentsInput, Prisma.CreditCardInvoiceUpdateWithoutInstallmentsInput>, Prisma.CreditCardInvoiceUncheckedUpdateWithoutInstallmentsInput>;
};
export type CreditCardInvoiceCreateWithoutUserInput = {
    id?: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutInvoicesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutInvoiceInput;
};
export type CreditCardInvoiceUncheckedCreateWithoutUserInput = {
    id?: string;
    cardId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type CreditCardInvoiceCreateOrConnectWithoutUserInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput>;
};
export type CreditCardInvoiceCreateManyUserInputEnvelope = {
    data: Prisma.CreditCardInvoiceCreateManyUserInput | Prisma.CreditCardInvoiceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInvoiceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardInvoiceUpdateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutUserInput>;
};
export type CreditCardInvoiceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateWithoutUserInput, Prisma.CreditCardInvoiceUncheckedUpdateWithoutUserInput>;
};
export type CreditCardInvoiceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.CreditCardInvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateManyMutationInput, Prisma.CreditCardInvoiceUncheckedUpdateManyWithoutUserInput>;
};
export type CreditCardInvoiceScalarWhereInput = {
    AND?: Prisma.CreditCardInvoiceScalarWhereInput | Prisma.CreditCardInvoiceScalarWhereInput[];
    OR?: Prisma.CreditCardInvoiceScalarWhereInput[];
    NOT?: Prisma.CreditCardInvoiceScalarWhereInput | Prisma.CreditCardInvoiceScalarWhereInput[];
    id?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    cardId?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    userId?: Prisma.UuidFilter<"CreditCardInvoice"> | string;
    referenceMonth?: Prisma.IntFilter<"CreditCardInvoice"> | number;
    referenceYear?: Prisma.IntFilter<"CreditCardInvoice"> | number;
    closingDate?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    dueDate?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    amount?: Prisma.DecimalFilter<"CreditCardInvoice"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFilter<"CreditCardInvoice"> | $Enums.InvoiceStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"CreditCardInvoice"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardInvoice"> | Date | string;
};
export type CreditCardInvoiceCreateWithoutCardInput = {
    id?: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInvoicesInput;
    installments?: Prisma.CreditCardInstallmentCreateNestedManyWithoutInvoiceInput;
};
export type CreditCardInvoiceUncheckedCreateWithoutCardInput = {
    id?: string;
    userId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type CreditCardInvoiceCreateOrConnectWithoutCardInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput>;
};
export type CreditCardInvoiceCreateManyCardInputEnvelope = {
    data: Prisma.CreditCardInvoiceCreateManyCardInput | Prisma.CreditCardInvoiceCreateManyCardInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInvoiceUpsertWithWhereUniqueWithoutCardInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.CreditCardInvoiceUpdateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedUpdateWithoutCardInput>;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutCardInput>;
};
export type CreditCardInvoiceUpdateWithWhereUniqueWithoutCardInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateWithoutCardInput, Prisma.CreditCardInvoiceUncheckedUpdateWithoutCardInput>;
};
export type CreditCardInvoiceUpdateManyWithWhereWithoutCardInput = {
    where: Prisma.CreditCardInvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateManyMutationInput, Prisma.CreditCardInvoiceUncheckedUpdateManyWithoutCardInput>;
};
export type CreditCardInvoiceCreateWithoutInstallmentsInput = {
    id?: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    card: Prisma.CreditCardCreateNestedOneWithoutInvoicesInput;
    user: Prisma.UserCreateNestedOneWithoutInvoicesInput;
};
export type CreditCardInvoiceUncheckedCreateWithoutInstallmentsInput = {
    id?: string;
    cardId: string;
    userId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInvoiceCreateOrConnectWithoutInstallmentsInput = {
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutInstallmentsInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutInstallmentsInput>;
};
export type CreditCardInvoiceUpsertWithoutInstallmentsInput = {
    update: Prisma.XOR<Prisma.CreditCardInvoiceUpdateWithoutInstallmentsInput, Prisma.CreditCardInvoiceUncheckedUpdateWithoutInstallmentsInput>;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateWithoutInstallmentsInput, Prisma.CreditCardInvoiceUncheckedCreateWithoutInstallmentsInput>;
    where?: Prisma.CreditCardInvoiceWhereInput;
};
export type CreditCardInvoiceUpdateToOneWithWhereWithoutInstallmentsInput = {
    where?: Prisma.CreditCardInvoiceWhereInput;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateWithoutInstallmentsInput, Prisma.CreditCardInvoiceUncheckedUpdateWithoutInstallmentsInput>;
};
export type CreditCardInvoiceUpdateWithoutInstallmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInvoicesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput;
};
export type CreditCardInvoiceUncheckedUpdateWithoutInstallmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInvoiceCreateManyUserInput = {
    id?: string;
    cardId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInvoiceUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    card?: Prisma.CreditCardUpdateOneRequiredWithoutInvoicesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutInvoiceNestedInput;
};
export type CreditCardInvoiceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type CreditCardInvoiceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cardId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInvoiceCreateManyCardInput = {
    id?: string;
    userId: string;
    referenceMonth: number;
    referenceYear: number;
    closingDate: Date | string;
    dueDate: Date | string;
    amount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InvoiceStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardInvoiceUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput;
    installments?: Prisma.CreditCardInstallmentUpdateManyWithoutInvoiceNestedInput;
};
export type CreditCardInvoiceUncheckedUpdateWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    installments?: Prisma.CreditCardInstallmentUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type CreditCardInvoiceUncheckedUpdateManyWithoutCardInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    referenceMonth?: Prisma.IntFieldUpdateOperationsInput | number;
    referenceYear?: Prisma.IntFieldUpdateOperationsInput | number;
    closingDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardInvoiceCountOutputType = {
    installments: number;
};
export type CreditCardInvoiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    installments?: boolean | CreditCardInvoiceCountOutputTypeCountInstallmentsArgs;
};
export type CreditCardInvoiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceCountOutputTypeSelect<ExtArgs> | null;
};
export type CreditCardInvoiceCountOutputTypeCountInstallmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInstallmentWhereInput;
};
export type CreditCardInvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    closingDate?: boolean;
    dueDate?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    installments?: boolean | Prisma.CreditCardInvoice$installmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CreditCardInvoiceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardInvoice"]>;
export type CreditCardInvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    closingDate?: boolean;
    dueDate?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardInvoice"]>;
export type CreditCardInvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    closingDate?: boolean;
    dueDate?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["creditCardInvoice"]>;
export type CreditCardInvoiceSelectScalar = {
    id?: boolean;
    cardId?: boolean;
    userId?: boolean;
    referenceMonth?: boolean;
    referenceYear?: boolean;
    closingDate?: boolean;
    dueDate?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CreditCardInvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "cardId" | "userId" | "referenceMonth" | "referenceYear" | "closingDate" | "dueDate" | "amount" | "status" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["creditCardInvoice"]>;
export type CreditCardInvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    installments?: boolean | Prisma.CreditCardInvoice$installmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.CreditCardInvoiceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CreditCardInvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CreditCardInvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    card?: boolean | Prisma.CreditCardDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CreditCardInvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CreditCardInvoice";
    objects: {
        card: Prisma.$CreditCardPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        installments: Prisma.$CreditCardInstallmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        cardId: string;
        userId: string;
        referenceMonth: number;
        referenceYear: number;
        closingDate: Date;
        dueDate: Date;
        amount: runtime.Decimal;
        status: $Enums.InvoiceStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["creditCardInvoice"]>;
    composites: {};
};
export type CreditCardInvoiceGetPayload<S extends boolean | null | undefined | CreditCardInvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload, S>;
export type CreditCardInvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CreditCardInvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CreditCardInvoiceCountAggregateInputType | true;
};
export interface CreditCardInvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CreditCardInvoice'];
        meta: {
            name: 'CreditCardInvoice';
        };
    };
    findUnique<T extends CreditCardInvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CreditCardInvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CreditCardInvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, CreditCardInvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CreditCardInvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CreditCardInvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CreditCardInvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, CreditCardInvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CreditCardInvoiceCreateArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CreditCardInvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, CreditCardInvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CreditCardInvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CreditCardInvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CreditCardInvoiceDeleteArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CreditCardInvoiceUpdateArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CreditCardInvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, CreditCardInvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CreditCardInvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CreditCardInvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CreditCardInvoiceUpsertArgs>(args: Prisma.SelectSubset<T, CreditCardInvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__CreditCardInvoiceClient<runtime.Types.Result.GetResult<Prisma.$CreditCardInvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CreditCardInvoiceCountArgs>(args?: Prisma.Subset<T, CreditCardInvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CreditCardInvoiceCountAggregateOutputType> : number>;
    aggregate<T extends CreditCardInvoiceAggregateArgs>(args: Prisma.Subset<T, CreditCardInvoiceAggregateArgs>): Prisma.PrismaPromise<GetCreditCardInvoiceAggregateType<T>>;
    groupBy<T extends CreditCardInvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CreditCardInvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: CreditCardInvoiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CreditCardInvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditCardInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CreditCardInvoiceFieldRefs;
}
export interface Prisma__CreditCardInvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    card<T extends Prisma.CreditCardDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardDefaultArgs<ExtArgs>>): Prisma.Prisma__CreditCardClient<runtime.Types.Result.GetResult<Prisma.$CreditCardPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    installments<T extends Prisma.CreditCardInvoice$installmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CreditCardInvoice$installmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CreditCardInvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"CreditCardInvoice", 'String'>;
    readonly cardId: Prisma.FieldRef<"CreditCardInvoice", 'String'>;
    readonly userId: Prisma.FieldRef<"CreditCardInvoice", 'String'>;
    readonly referenceMonth: Prisma.FieldRef<"CreditCardInvoice", 'Int'>;
    readonly referenceYear: Prisma.FieldRef<"CreditCardInvoice", 'Int'>;
    readonly closingDate: Prisma.FieldRef<"CreditCardInvoice", 'DateTime'>;
    readonly dueDate: Prisma.FieldRef<"CreditCardInvoice", 'DateTime'>;
    readonly amount: Prisma.FieldRef<"CreditCardInvoice", 'Decimal'>;
    readonly status: Prisma.FieldRef<"CreditCardInvoice", 'InvoiceStatus'>;
    readonly paidAt: Prisma.FieldRef<"CreditCardInvoice", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"CreditCardInvoice", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CreditCardInvoice", 'DateTime'>;
}
export type CreditCardInvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
};
export type CreditCardInvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
};
export type CreditCardInvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardInvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardInvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardInvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardInvoiceCreateInput, Prisma.CreditCardInvoiceUncheckedCreateInput>;
};
export type CreditCardInvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CreditCardInvoiceCreateManyInput | Prisma.CreditCardInvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CreditCardInvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    data: Prisma.CreditCardInvoiceCreateManyInput | Prisma.CreditCardInvoiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CreditCardInvoiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CreditCardInvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateInput, Prisma.CreditCardInvoiceUncheckedUpdateInput>;
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
};
export type CreditCardInvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateManyMutationInput, Prisma.CreditCardInvoiceUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardInvoiceWhereInput;
    limit?: number;
};
export type CreditCardInvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardInvoiceUpdateManyMutationInput, Prisma.CreditCardInvoiceUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardInvoiceWhereInput;
    limit?: number;
    include?: Prisma.CreditCardInvoiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CreditCardInvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardInvoiceCreateInput, Prisma.CreditCardInvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CreditCardInvoiceUpdateInput, Prisma.CreditCardInvoiceUncheckedUpdateInput>;
};
export type CreditCardInvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
    where: Prisma.CreditCardInvoiceWhereUniqueInput;
};
export type CreditCardInvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardInvoiceWhereInput;
    limit?: number;
};
export type CreditCardInvoice$installmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type CreditCardInvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardInvoiceSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardInvoiceOmit<ExtArgs> | null;
    include?: Prisma.CreditCardInvoiceInclude<ExtArgs> | null;
};
