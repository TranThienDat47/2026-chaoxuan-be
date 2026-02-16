"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedEnvelopeSchema = exports.RedEnvelope = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RedEnvelope = class RedEnvelope {
    amount;
    message;
    qrCode;
    isClaimed;
    claimedAt;
    winnerIp;
    winnerConnectionIp;
    winnerSocketId;
    index;
    link;
};
exports.RedEnvelope = RedEnvelope;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RedEnvelope.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RedEnvelope.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RedEnvelope.prototype, "qrCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RedEnvelope.prototype, "isClaimed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], RedEnvelope.prototype, "claimedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RedEnvelope.prototype, "winnerIp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RedEnvelope.prototype, "winnerConnectionIp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RedEnvelope.prototype, "winnerSocketId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], RedEnvelope.prototype, "index", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RedEnvelope.prototype, "link", void 0);
exports.RedEnvelope = RedEnvelope = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RedEnvelope);
exports.RedEnvelopeSchema = mongoose_1.SchemaFactory.createForClass(RedEnvelope);
//# sourceMappingURL=red-envelope.schema.js.map