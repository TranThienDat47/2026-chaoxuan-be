import { HydratedDocument } from 'mongoose';
export type RedEnvelopeDocument = HydratedDocument<RedEnvelope>;
export declare class RedEnvelope {
    amount: number;
    message: string;
    qrCode: string;
    isClaimed: boolean;
    claimedAt: Date;
    winnerIp: string;
    winnerConnectionIp: string;
    winnerSocketId: string;
    index: number;
    link: string;
}
export declare const RedEnvelopeSchema: import("mongoose").Schema<RedEnvelope, import("mongoose").Model<RedEnvelope, any, any, any, (import("mongoose").Document<unknown, any, RedEnvelope, any, import("mongoose").DefaultSchemaOptions> & RedEnvelope & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, RedEnvelope, any, import("mongoose").DefaultSchemaOptions> & RedEnvelope & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, RedEnvelope>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    amount?: import("mongoose").SchemaDefinitionProperty<number, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    qrCode?: import("mongoose").SchemaDefinitionProperty<string, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isClaimed?: import("mongoose").SchemaDefinitionProperty<boolean, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    claimedAt?: import("mongoose").SchemaDefinitionProperty<Date, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    winnerIp?: import("mongoose").SchemaDefinitionProperty<string, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    winnerConnectionIp?: import("mongoose").SchemaDefinitionProperty<string, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    winnerSocketId?: import("mongoose").SchemaDefinitionProperty<string, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    index?: import("mongoose").SchemaDefinitionProperty<number, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    link?: import("mongoose").SchemaDefinitionProperty<string, RedEnvelope, import("mongoose").Document<unknown, {}, RedEnvelope, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<RedEnvelope & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, RedEnvelope>;
