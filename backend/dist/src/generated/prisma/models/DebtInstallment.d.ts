import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type DebtInstallmentModel = runtime.Types.Result.DefaultSelection<Prisma.$DebtInstallmentPayload>;
export type AggregateDebtInstallment = {
    _count: DebtInstallmentCountAggregateOutputType | null;
    _avg: DebtInstallmentAvgAggregateOutputType | null;
    _sum: DebtInstallmentSumAggregateOutputType | null;
    _min: DebtInstallmentMinAggregateOutputType | null;
    _max: DebtInstallmentMaxAggregateOutputType | null;
};
export type DebtInstallmentAvgAggregateOutputType = {
    installmentNumber: number | null;
    principalAmount: runtime.Decimal | null;
    interestAmount: runtime.Decimal | null;
    penaltyAmount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    paidAmount: runtime.Decimal | null;
};
export type DebtInstallmentSumAggregateOutputType = {
    installmentNumber: number | null;
    principalAmount: runtime.Decimal | null;
    interestAmount: runtime.Decimal | null;
    penaltyAmount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    paidAmount: runtime.Decimal | null;
};
export type DebtInstallmentMinAggregateOutputType = {
    id: string | null;
    debtId: string | null;
    userId: string | null;
    installmentNumber: number | null;
    dueDate: Date | null;
    principalAmount: runtime.Decimal | null;
    interestAmount: runtime.Decimal | null;
    penaltyAmount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    paidAmount: runtime.Decimal | null;
    status: $Enums.InstallmentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type DebtInstallmentMaxAggregateOutputType = {
    id: string | null;
    debtId: string | null;
    userId: string | null;
    installmentNumber: number | null;
    dueDate: Date | null;
    principalAmount: runtime.Decimal | null;
    interestAmount: runtime.Decimal | null;
    penaltyAmount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    paidAmount: runtime.Decimal | null;
    status: $Enums.InstallmentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
};
export type DebtInstallmentCountAggregateOutputType = {
    id: number;
    debtId: number;
    userId: number;
    installmentNumber: number;
    dueDate: number;
    principalAmount: number;
    interestAmount: number;
    penaltyAmount: number;
    totalAmount: number;
    paidAmount: number;
    status: number;
    paidAt: number;
    createdAt: number;
    _all: number;
};
export type DebtInstallmentAvgAggregateInputType = {
    installmentNumber?: true;
    principalAmount?: true;
    interestAmount?: true;
    penaltyAmount?: true;
    totalAmount?: true;
    paidAmount?: true;
};
export type DebtInstallmentSumAggregateInputType = {
    installmentNumber?: true;
    principalAmount?: true;
    interestAmount?: true;
    penaltyAmount?: true;
    totalAmount?: true;
    paidAmount?: true;
};
export type DebtInstallmentMinAggregateInputType = {
    id?: true;
    debtId?: true;
    userId?: true;
    installmentNumber?: true;
    dueDate?: true;
    principalAmount?: true;
    interestAmount?: true;
    penaltyAmount?: true;
    totalAmount?: true;
    paidAmount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
};
export type DebtInstallmentMaxAggregateInputType = {
    id?: true;
    debtId?: true;
    userId?: true;
    installmentNumber?: true;
    dueDate?: true;
    principalAmount?: true;
    interestAmount?: true;
    penaltyAmount?: true;
    totalAmount?: true;
    paidAmount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
};
export type DebtInstallmentCountAggregateInputType = {
    id?: true;
    debtId?: true;
    userId?: true;
    installmentNumber?: true;
    dueDate?: true;
    principalAmount?: true;
    interestAmount?: true;
    penaltyAmount?: true;
    totalAmount?: true;
    paidAmount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    _all?: true;
};
export type DebtInstallmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtInstallmentWhereInput;
    orderBy?: Prisma.DebtInstallmentOrderByWithRelationInput | Prisma.DebtInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.DebtInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DebtInstallmentCountAggregateInputType;
    _avg?: DebtInstallmentAvgAggregateInputType;
    _sum?: DebtInstallmentSumAggregateInputType;
    _min?: DebtInstallmentMinAggregateInputType;
    _max?: DebtInstallmentMaxAggregateInputType;
};
export type GetDebtInstallmentAggregateType<T extends DebtInstallmentAggregateArgs> = {
    [P in keyof T & keyof AggregateDebtInstallment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDebtInstallment[P]> : Prisma.GetScalarType<T[P], AggregateDebtInstallment[P]>;
};
export type DebtInstallmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtInstallmentWhereInput;
    orderBy?: Prisma.DebtInstallmentOrderByWithAggregationInput | Prisma.DebtInstallmentOrderByWithAggregationInput[];
    by: Prisma.DebtInstallmentScalarFieldEnum[] | Prisma.DebtInstallmentScalarFieldEnum;
    having?: Prisma.DebtInstallmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DebtInstallmentCountAggregateInputType | true;
    _avg?: DebtInstallmentAvgAggregateInputType;
    _sum?: DebtInstallmentSumAggregateInputType;
    _min?: DebtInstallmentMinAggregateInputType;
    _max?: DebtInstallmentMaxAggregateInputType;
};
export type DebtInstallmentGroupByOutputType = {
    id: string;
    debtId: string;
    userId: string;
    installmentNumber: number;
    dueDate: Date;
    principalAmount: runtime.Decimal;
    interestAmount: runtime.Decimal;
    penaltyAmount: runtime.Decimal;
    totalAmount: runtime.Decimal;
    paidAmount: runtime.Decimal;
    status: $Enums.InstallmentStatus;
    paidAt: Date | null;
    createdAt: Date;
    _count: DebtInstallmentCountAggregateOutputType | null;
    _avg: DebtInstallmentAvgAggregateOutputType | null;
    _sum: DebtInstallmentSumAggregateOutputType | null;
    _min: DebtInstallmentMinAggregateOutputType | null;
    _max: DebtInstallmentMaxAggregateOutputType | null;
};
export type GetDebtInstallmentGroupByPayload<T extends DebtInstallmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DebtInstallmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DebtInstallmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DebtInstallmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DebtInstallmentGroupByOutputType[P]>;
}>>;
export type DebtInstallmentWhereInput = {
    AND?: Prisma.DebtInstallmentWhereInput | Prisma.DebtInstallmentWhereInput[];
    OR?: Prisma.DebtInstallmentWhereInput[];
    NOT?: Prisma.DebtInstallmentWhereInput | Prisma.DebtInstallmentWhereInput[];
    id?: Prisma.UuidFilter<"DebtInstallment"> | string;
    debtId?: Prisma.UuidFilter<"DebtInstallment"> | string;
    userId?: Prisma.UuidFilter<"DebtInstallment"> | string;
    installmentNumber?: Prisma.IntFilter<"DebtInstallment"> | number;
    dueDate?: Prisma.DateTimeFilter<"DebtInstallment"> | Date | string;
    principalAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFilter<"DebtInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"DebtInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtInstallment"> | Date | string;
    debt?: Prisma.XOR<Prisma.DebtScalarRelationFilter, Prisma.DebtWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    payments?: Prisma.DebtPaymentListRelationFilter;
};
export type DebtInstallmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    debt?: Prisma.DebtOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    payments?: Prisma.DebtPaymentOrderByRelationAggregateInput;
};
export type DebtInstallmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DebtInstallmentWhereInput | Prisma.DebtInstallmentWhereInput[];
    OR?: Prisma.DebtInstallmentWhereInput[];
    NOT?: Prisma.DebtInstallmentWhereInput | Prisma.DebtInstallmentWhereInput[];
    debtId?: Prisma.UuidFilter<"DebtInstallment"> | string;
    userId?: Prisma.UuidFilter<"DebtInstallment"> | string;
    installmentNumber?: Prisma.IntFilter<"DebtInstallment"> | number;
    dueDate?: Prisma.DateTimeFilter<"DebtInstallment"> | Date | string;
    principalAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFilter<"DebtInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"DebtInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtInstallment"> | Date | string;
    debt?: Prisma.XOR<Prisma.DebtScalarRelationFilter, Prisma.DebtWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    payments?: Prisma.DebtPaymentListRelationFilter;
}, "id">;
export type DebtInstallmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DebtInstallmentCountOrderByAggregateInput;
    _avg?: Prisma.DebtInstallmentAvgOrderByAggregateInput;
    _max?: Prisma.DebtInstallmentMaxOrderByAggregateInput;
    _min?: Prisma.DebtInstallmentMinOrderByAggregateInput;
    _sum?: Prisma.DebtInstallmentSumOrderByAggregateInput;
};
export type DebtInstallmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.DebtInstallmentScalarWhereWithAggregatesInput | Prisma.DebtInstallmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.DebtInstallmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DebtInstallmentScalarWhereWithAggregatesInput | Prisma.DebtInstallmentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"DebtInstallment"> | string;
    debtId?: Prisma.UuidWithAggregatesFilter<"DebtInstallment"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"DebtInstallment"> | string;
    installmentNumber?: Prisma.IntWithAggregatesFilter<"DebtInstallment"> | number;
    dueDate?: Prisma.DateTimeWithAggregatesFilter<"DebtInstallment"> | Date | string;
    principalAmount?: Prisma.DecimalWithAggregatesFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalWithAggregatesFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalWithAggregatesFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalWithAggregatesFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalWithAggregatesFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusWithAggregatesFilter<"DebtInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"DebtInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"DebtInstallment"> | Date | string;
};
export type DebtInstallmentCreateInput = {
    id?: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    debt: Prisma.DebtCreateNestedOneWithoutInstallmentsInput;
    user: Prisma.UserCreateNestedOneWithoutDebtInstallmentsInput;
    payments?: Prisma.DebtPaymentCreateNestedManyWithoutInstallmentInput;
};
export type DebtInstallmentUncheckedCreateInput = {
    id?: string;
    debtId: string;
    userId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    payments?: Prisma.DebtPaymentUncheckedCreateNestedManyWithoutInstallmentInput;
};
export type DebtInstallmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutInstallmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutDebtInstallmentsNestedInput;
    payments?: Prisma.DebtPaymentUpdateManyWithoutInstallmentNestedInput;
};
export type DebtInstallmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.DebtPaymentUncheckedUpdateManyWithoutInstallmentNestedInput;
};
export type DebtInstallmentCreateManyInput = {
    id?: string;
    debtId: string;
    userId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DebtInstallmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtInstallmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtInstallmentListRelationFilter = {
    every?: Prisma.DebtInstallmentWhereInput;
    some?: Prisma.DebtInstallmentWhereInput;
    none?: Prisma.DebtInstallmentWhereInput;
};
export type DebtInstallmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DebtInstallmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DebtInstallmentAvgOrderByAggregateInput = {
    installmentNumber?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
};
export type DebtInstallmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DebtInstallmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    debtId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    installmentNumber?: Prisma.SortOrder;
    dueDate?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DebtInstallmentSumOrderByAggregateInput = {
    installmentNumber?: Prisma.SortOrder;
    principalAmount?: Prisma.SortOrder;
    interestAmount?: Prisma.SortOrder;
    penaltyAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    paidAmount?: Prisma.SortOrder;
};
export type DebtInstallmentNullableScalarRelationFilter = {
    is?: Prisma.DebtInstallmentWhereInput | null;
    isNot?: Prisma.DebtInstallmentWhereInput | null;
};
export type DebtInstallmentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutUserInput, Prisma.DebtInstallmentUncheckedCreateWithoutUserInput> | Prisma.DebtInstallmentCreateWithoutUserInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutUserInput | Prisma.DebtInstallmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DebtInstallmentCreateManyUserInputEnvelope;
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
};
export type DebtInstallmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutUserInput, Prisma.DebtInstallmentUncheckedCreateWithoutUserInput> | Prisma.DebtInstallmentCreateWithoutUserInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutUserInput | Prisma.DebtInstallmentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DebtInstallmentCreateManyUserInputEnvelope;
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
};
export type DebtInstallmentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutUserInput, Prisma.DebtInstallmentUncheckedCreateWithoutUserInput> | Prisma.DebtInstallmentCreateWithoutUserInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutUserInput | Prisma.DebtInstallmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutUserInput | Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DebtInstallmentCreateManyUserInputEnvelope;
    set?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    disconnect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    delete?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    update?: Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutUserInput | Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DebtInstallmentUpdateManyWithWhereWithoutUserInput | Prisma.DebtInstallmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DebtInstallmentScalarWhereInput | Prisma.DebtInstallmentScalarWhereInput[];
};
export type DebtInstallmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutUserInput, Prisma.DebtInstallmentUncheckedCreateWithoutUserInput> | Prisma.DebtInstallmentCreateWithoutUserInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutUserInput | Prisma.DebtInstallmentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutUserInput | Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DebtInstallmentCreateManyUserInputEnvelope;
    set?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    disconnect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    delete?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    update?: Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutUserInput | Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DebtInstallmentUpdateManyWithWhereWithoutUserInput | Prisma.DebtInstallmentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DebtInstallmentScalarWhereInput | Prisma.DebtInstallmentScalarWhereInput[];
};
export type DebtInstallmentCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutDebtInput, Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput> | Prisma.DebtInstallmentCreateWithoutDebtInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput | Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.DebtInstallmentCreateManyDebtInputEnvelope;
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
};
export type DebtInstallmentUncheckedCreateNestedManyWithoutDebtInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutDebtInput, Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput> | Prisma.DebtInstallmentCreateWithoutDebtInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput | Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput[];
    createMany?: Prisma.DebtInstallmentCreateManyDebtInputEnvelope;
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
};
export type DebtInstallmentUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutDebtInput, Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput> | Prisma.DebtInstallmentCreateWithoutDebtInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput | Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutDebtInput | Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.DebtInstallmentCreateManyDebtInputEnvelope;
    set?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    disconnect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    delete?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    update?: Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutDebtInput | Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.DebtInstallmentUpdateManyWithWhereWithoutDebtInput | Prisma.DebtInstallmentUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.DebtInstallmentScalarWhereInput | Prisma.DebtInstallmentScalarWhereInput[];
};
export type DebtInstallmentUncheckedUpdateManyWithoutDebtNestedInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutDebtInput, Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput> | Prisma.DebtInstallmentCreateWithoutDebtInput[] | Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput[];
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput | Prisma.DebtInstallmentCreateOrConnectWithoutDebtInput[];
    upsert?: Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutDebtInput | Prisma.DebtInstallmentUpsertWithWhereUniqueWithoutDebtInput[];
    createMany?: Prisma.DebtInstallmentCreateManyDebtInputEnvelope;
    set?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    disconnect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    delete?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    connect?: Prisma.DebtInstallmentWhereUniqueInput | Prisma.DebtInstallmentWhereUniqueInput[];
    update?: Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutDebtInput | Prisma.DebtInstallmentUpdateWithWhereUniqueWithoutDebtInput[];
    updateMany?: Prisma.DebtInstallmentUpdateManyWithWhereWithoutDebtInput | Prisma.DebtInstallmentUpdateManyWithWhereWithoutDebtInput[];
    deleteMany?: Prisma.DebtInstallmentScalarWhereInput | Prisma.DebtInstallmentScalarWhereInput[];
};
export type DebtInstallmentCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutPaymentsInput, Prisma.DebtInstallmentUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.DebtInstallmentWhereUniqueInput;
};
export type DebtInstallmentUpdateOneWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutPaymentsInput, Prisma.DebtInstallmentUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.DebtInstallmentCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.DebtInstallmentUpsertWithoutPaymentsInput;
    disconnect?: Prisma.DebtInstallmentWhereInput | boolean;
    delete?: Prisma.DebtInstallmentWhereInput | boolean;
    connect?: Prisma.DebtInstallmentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DebtInstallmentUpdateToOneWithWhereWithoutPaymentsInput, Prisma.DebtInstallmentUpdateWithoutPaymentsInput>, Prisma.DebtInstallmentUncheckedUpdateWithoutPaymentsInput>;
};
export type DebtInstallmentCreateWithoutUserInput = {
    id?: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    debt: Prisma.DebtCreateNestedOneWithoutInstallmentsInput;
    payments?: Prisma.DebtPaymentCreateNestedManyWithoutInstallmentInput;
};
export type DebtInstallmentUncheckedCreateWithoutUserInput = {
    id?: string;
    debtId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    payments?: Prisma.DebtPaymentUncheckedCreateNestedManyWithoutInstallmentInput;
};
export type DebtInstallmentCreateOrConnectWithoutUserInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutUserInput, Prisma.DebtInstallmentUncheckedCreateWithoutUserInput>;
};
export type DebtInstallmentCreateManyUserInputEnvelope = {
    data: Prisma.DebtInstallmentCreateManyUserInput | Prisma.DebtInstallmentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DebtInstallmentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtInstallmentUpdateWithoutUserInput, Prisma.DebtInstallmentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutUserInput, Prisma.DebtInstallmentUncheckedCreateWithoutUserInput>;
};
export type DebtInstallmentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateWithoutUserInput, Prisma.DebtInstallmentUncheckedUpdateWithoutUserInput>;
};
export type DebtInstallmentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DebtInstallmentScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateManyMutationInput, Prisma.DebtInstallmentUncheckedUpdateManyWithoutUserInput>;
};
export type DebtInstallmentScalarWhereInput = {
    AND?: Prisma.DebtInstallmentScalarWhereInput | Prisma.DebtInstallmentScalarWhereInput[];
    OR?: Prisma.DebtInstallmentScalarWhereInput[];
    NOT?: Prisma.DebtInstallmentScalarWhereInput | Prisma.DebtInstallmentScalarWhereInput[];
    id?: Prisma.UuidFilter<"DebtInstallment"> | string;
    debtId?: Prisma.UuidFilter<"DebtInstallment"> | string;
    userId?: Prisma.UuidFilter<"DebtInstallment"> | string;
    installmentNumber?: Prisma.IntFilter<"DebtInstallment"> | number;
    dueDate?: Prisma.DateTimeFilter<"DebtInstallment"> | Date | string;
    principalAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFilter<"DebtInstallment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFilter<"DebtInstallment"> | $Enums.InstallmentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"DebtInstallment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"DebtInstallment"> | Date | string;
};
export type DebtInstallmentCreateWithoutDebtInput = {
    id?: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutDebtInstallmentsInput;
    payments?: Prisma.DebtPaymentCreateNestedManyWithoutInstallmentInput;
};
export type DebtInstallmentUncheckedCreateWithoutDebtInput = {
    id?: string;
    userId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    payments?: Prisma.DebtPaymentUncheckedCreateNestedManyWithoutInstallmentInput;
};
export type DebtInstallmentCreateOrConnectWithoutDebtInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutDebtInput, Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput>;
};
export type DebtInstallmentCreateManyDebtInputEnvelope = {
    data: Prisma.DebtInstallmentCreateManyDebtInput | Prisma.DebtInstallmentCreateManyDebtInput[];
    skipDuplicates?: boolean;
};
export type DebtInstallmentUpsertWithWhereUniqueWithoutDebtInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.DebtInstallmentUpdateWithoutDebtInput, Prisma.DebtInstallmentUncheckedUpdateWithoutDebtInput>;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutDebtInput, Prisma.DebtInstallmentUncheckedCreateWithoutDebtInput>;
};
export type DebtInstallmentUpdateWithWhereUniqueWithoutDebtInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateWithoutDebtInput, Prisma.DebtInstallmentUncheckedUpdateWithoutDebtInput>;
};
export type DebtInstallmentUpdateManyWithWhereWithoutDebtInput = {
    where: Prisma.DebtInstallmentScalarWhereInput;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateManyMutationInput, Prisma.DebtInstallmentUncheckedUpdateManyWithoutDebtInput>;
};
export type DebtInstallmentCreateWithoutPaymentsInput = {
    id?: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    debt: Prisma.DebtCreateNestedOneWithoutInstallmentsInput;
    user: Prisma.UserCreateNestedOneWithoutDebtInstallmentsInput;
};
export type DebtInstallmentUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    debtId: string;
    userId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DebtInstallmentCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.DebtInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutPaymentsInput, Prisma.DebtInstallmentUncheckedCreateWithoutPaymentsInput>;
};
export type DebtInstallmentUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.DebtInstallmentUpdateWithoutPaymentsInput, Prisma.DebtInstallmentUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateWithoutPaymentsInput, Prisma.DebtInstallmentUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.DebtInstallmentWhereInput;
};
export type DebtInstallmentUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.DebtInstallmentWhereInput;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateWithoutPaymentsInput, Prisma.DebtInstallmentUncheckedUpdateWithoutPaymentsInput>;
};
export type DebtInstallmentUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutInstallmentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutDebtInstallmentsNestedInput;
};
export type DebtInstallmentUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtInstallmentCreateManyUserInput = {
    id?: string;
    debtId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DebtInstallmentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    debt?: Prisma.DebtUpdateOneRequiredWithoutInstallmentsNestedInput;
    payments?: Prisma.DebtPaymentUpdateManyWithoutInstallmentNestedInput;
};
export type DebtInstallmentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.DebtPaymentUncheckedUpdateManyWithoutInstallmentNestedInput;
};
export type DebtInstallmentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    debtId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtInstallmentCreateManyDebtInput = {
    id?: string;
    userId: string;
    installmentNumber: number;
    dueDate: Date | string;
    principalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.InstallmentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type DebtInstallmentUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutDebtInstallmentsNestedInput;
    payments?: Prisma.DebtPaymentUpdateManyWithoutInstallmentNestedInput;
};
export type DebtInstallmentUncheckedUpdateWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.DebtPaymentUncheckedUpdateManyWithoutInstallmentNestedInput;
};
export type DebtInstallmentUncheckedUpdateManyWithoutDebtInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    installmentNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    dueDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    principalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    interestAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    penaltyAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    paidAmount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumInstallmentStatusFieldUpdateOperationsInput | $Enums.InstallmentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DebtInstallmentCountOutputType = {
    payments: number;
};
export type DebtInstallmentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    payments?: boolean | DebtInstallmentCountOutputTypeCountPaymentsArgs;
};
export type DebtInstallmentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentCountOutputTypeSelect<ExtArgs> | null;
};
export type DebtInstallmentCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtPaymentWhereInput;
};
export type DebtInstallmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    debtId?: boolean;
    userId?: boolean;
    installmentNumber?: boolean;
    dueDate?: boolean;
    principalAmount?: boolean;
    interestAmount?: boolean;
    penaltyAmount?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    payments?: boolean | Prisma.DebtInstallment$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.DebtInstallmentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtInstallment"]>;
export type DebtInstallmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    debtId?: boolean;
    userId?: boolean;
    installmentNumber?: boolean;
    dueDate?: boolean;
    principalAmount?: boolean;
    interestAmount?: boolean;
    penaltyAmount?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtInstallment"]>;
export type DebtInstallmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    debtId?: boolean;
    userId?: boolean;
    installmentNumber?: boolean;
    dueDate?: boolean;
    principalAmount?: boolean;
    interestAmount?: boolean;
    penaltyAmount?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["debtInstallment"]>;
export type DebtInstallmentSelectScalar = {
    id?: boolean;
    debtId?: boolean;
    userId?: boolean;
    installmentNumber?: boolean;
    dueDate?: boolean;
    principalAmount?: boolean;
    interestAmount?: boolean;
    penaltyAmount?: boolean;
    totalAmount?: boolean;
    paidAmount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
};
export type DebtInstallmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "debtId" | "userId" | "installmentNumber" | "dueDate" | "principalAmount" | "interestAmount" | "penaltyAmount" | "totalAmount" | "paidAmount" | "status" | "paidAt" | "createdAt", ExtArgs["result"]["debtInstallment"]>;
export type DebtInstallmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    payments?: boolean | Prisma.DebtInstallment$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.DebtInstallmentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DebtInstallmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type DebtInstallmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    debt?: boolean | Prisma.DebtDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $DebtInstallmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "DebtInstallment";
    objects: {
        debt: Prisma.$DebtPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        payments: Prisma.$DebtPaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        debtId: string;
        userId: string;
        installmentNumber: number;
        dueDate: Date;
        principalAmount: runtime.Decimal;
        interestAmount: runtime.Decimal;
        penaltyAmount: runtime.Decimal;
        totalAmount: runtime.Decimal;
        paidAmount: runtime.Decimal;
        status: $Enums.InstallmentStatus;
        paidAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["debtInstallment"]>;
    composites: {};
};
export type DebtInstallmentGetPayload<S extends boolean | null | undefined | DebtInstallmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload, S>;
export type DebtInstallmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DebtInstallmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DebtInstallmentCountAggregateInputType | true;
};
export interface DebtInstallmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['DebtInstallment'];
        meta: {
            name: 'DebtInstallment';
        };
    };
    findUnique<T extends DebtInstallmentFindUniqueArgs>(args: Prisma.SelectSubset<T, DebtInstallmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DebtInstallmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DebtInstallmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DebtInstallmentFindFirstArgs>(args?: Prisma.SelectSubset<T, DebtInstallmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DebtInstallmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DebtInstallmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DebtInstallmentFindManyArgs>(args?: Prisma.SelectSubset<T, DebtInstallmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DebtInstallmentCreateArgs>(args: Prisma.SelectSubset<T, DebtInstallmentCreateArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DebtInstallmentCreateManyArgs>(args?: Prisma.SelectSubset<T, DebtInstallmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DebtInstallmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DebtInstallmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DebtInstallmentDeleteArgs>(args: Prisma.SelectSubset<T, DebtInstallmentDeleteArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DebtInstallmentUpdateArgs>(args: Prisma.SelectSubset<T, DebtInstallmentUpdateArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DebtInstallmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, DebtInstallmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DebtInstallmentUpdateManyArgs>(args: Prisma.SelectSubset<T, DebtInstallmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DebtInstallmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DebtInstallmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DebtInstallmentUpsertArgs>(args: Prisma.SelectSubset<T, DebtInstallmentUpsertArgs<ExtArgs>>): Prisma.Prisma__DebtInstallmentClient<runtime.Types.Result.GetResult<Prisma.$DebtInstallmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DebtInstallmentCountArgs>(args?: Prisma.Subset<T, DebtInstallmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DebtInstallmentCountAggregateOutputType> : number>;
    aggregate<T extends DebtInstallmentAggregateArgs>(args: Prisma.Subset<T, DebtInstallmentAggregateArgs>): Prisma.PrismaPromise<GetDebtInstallmentAggregateType<T>>;
    groupBy<T extends DebtInstallmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DebtInstallmentGroupByArgs['orderBy'];
    } : {
        orderBy?: DebtInstallmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DebtInstallmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtInstallmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DebtInstallmentFieldRefs;
}
export interface Prisma__DebtInstallmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    debt<T extends Prisma.DebtDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtDefaultArgs<ExtArgs>>): Prisma.Prisma__DebtClient<runtime.Types.Result.GetResult<Prisma.$DebtPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    payments<T extends Prisma.DebtInstallment$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DebtInstallment$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DebtPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DebtInstallmentFieldRefs {
    readonly id: Prisma.FieldRef<"DebtInstallment", 'String'>;
    readonly debtId: Prisma.FieldRef<"DebtInstallment", 'String'>;
    readonly userId: Prisma.FieldRef<"DebtInstallment", 'String'>;
    readonly installmentNumber: Prisma.FieldRef<"DebtInstallment", 'Int'>;
    readonly dueDate: Prisma.FieldRef<"DebtInstallment", 'DateTime'>;
    readonly principalAmount: Prisma.FieldRef<"DebtInstallment", 'Decimal'>;
    readonly interestAmount: Prisma.FieldRef<"DebtInstallment", 'Decimal'>;
    readonly penaltyAmount: Prisma.FieldRef<"DebtInstallment", 'Decimal'>;
    readonly totalAmount: Prisma.FieldRef<"DebtInstallment", 'Decimal'>;
    readonly paidAmount: Prisma.FieldRef<"DebtInstallment", 'Decimal'>;
    readonly status: Prisma.FieldRef<"DebtInstallment", 'InstallmentStatus'>;
    readonly paidAt: Prisma.FieldRef<"DebtInstallment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"DebtInstallment", 'DateTime'>;
}
export type DebtInstallmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where: Prisma.DebtInstallmentWhereUniqueInput;
};
export type DebtInstallmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where: Prisma.DebtInstallmentWhereUniqueInput;
};
export type DebtInstallmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where?: Prisma.DebtInstallmentWhereInput;
    orderBy?: Prisma.DebtInstallmentOrderByWithRelationInput | Prisma.DebtInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.DebtInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtInstallmentScalarFieldEnum | Prisma.DebtInstallmentScalarFieldEnum[];
};
export type DebtInstallmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where?: Prisma.DebtInstallmentWhereInput;
    orderBy?: Prisma.DebtInstallmentOrderByWithRelationInput | Prisma.DebtInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.DebtInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtInstallmentScalarFieldEnum | Prisma.DebtInstallmentScalarFieldEnum[];
};
export type DebtInstallmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where?: Prisma.DebtInstallmentWhereInput;
    orderBy?: Prisma.DebtInstallmentOrderByWithRelationInput | Prisma.DebtInstallmentOrderByWithRelationInput[];
    cursor?: Prisma.DebtInstallmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DebtInstallmentScalarFieldEnum | Prisma.DebtInstallmentScalarFieldEnum[];
};
export type DebtInstallmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtInstallmentCreateInput, Prisma.DebtInstallmentUncheckedCreateInput>;
};
export type DebtInstallmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DebtInstallmentCreateManyInput | Prisma.DebtInstallmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DebtInstallmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    data: Prisma.DebtInstallmentCreateManyInput | Prisma.DebtInstallmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DebtInstallmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DebtInstallmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateInput, Prisma.DebtInstallmentUncheckedUpdateInput>;
    where: Prisma.DebtInstallmentWhereUniqueInput;
};
export type DebtInstallmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateManyMutationInput, Prisma.DebtInstallmentUncheckedUpdateManyInput>;
    where?: Prisma.DebtInstallmentWhereInput;
    limit?: number;
};
export type DebtInstallmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DebtInstallmentUpdateManyMutationInput, Prisma.DebtInstallmentUncheckedUpdateManyInput>;
    where?: Prisma.DebtInstallmentWhereInput;
    limit?: number;
    include?: Prisma.DebtInstallmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DebtInstallmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where: Prisma.DebtInstallmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DebtInstallmentCreateInput, Prisma.DebtInstallmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DebtInstallmentUpdateInput, Prisma.DebtInstallmentUncheckedUpdateInput>;
};
export type DebtInstallmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
    where: Prisma.DebtInstallmentWhereUniqueInput;
};
export type DebtInstallmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DebtInstallmentWhereInput;
    limit?: number;
};
export type DebtInstallment$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type DebtInstallmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DebtInstallmentSelect<ExtArgs> | null;
    omit?: Prisma.DebtInstallmentOmit<ExtArgs> | null;
    include?: Prisma.DebtInstallmentInclude<ExtArgs> | null;
};
