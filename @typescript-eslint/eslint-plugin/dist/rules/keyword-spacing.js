"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const util = __importStar(require("../util"));
const getESLintCoreRule_1 = require("../util/getESLintCoreRule");
const baseRule = (0, getESLintCoreRule_1.getESLintCoreRule)('keyword-spacing');
exports.default = util.createRule({
    name: 'keyword-spacing',
    meta: {
        type: 'layout',
        docs: {
            description: 'Enforce consistent spacing before and after keywords',
            recommended: false,
            extendsBaseRule: true,
        },
        fixable: 'whitespace',
        hasSuggestions: baseRule.meta.hasSuggestions,
        schema: baseRule.meta.schema,
        messages: baseRule.meta.messages,
    },
    defaultOptions: [{}],
    create(context, [{ after }]) {
        const sourceCode = context.getSourceCode();
        const baseRules = baseRule.create(context);
        return Object.assign(Object.assign({}, baseRules), { TSAsExpression(node) {
                const asToken = util.nullThrows(sourceCode.getTokenAfter(node.expression, token => token.value === 'as'), util.NullThrowsReasons.MissingToken('as', node.type));
                const oldTokenType = asToken.type;
                // as is a contextual keyword, so it's always reported as an Identifier
                // the rule looks for keyword tokens, so we temporarily override it
                // we mutate it at the token level because the rule calls sourceCode.getFirstToken,
                // so mutating a copy would not change the underlying copy returned by that method
                asToken.type = utils_1.AST_TOKEN_TYPES.Keyword;
                // use this selector just because it is just a call to `checkSpacingAroundFirstToken`
                baseRules.DebuggerStatement(asToken);
                // make sure to reset the type afterward so we don't permanently mutate the AST
                asToken.type = oldTokenType;
            },
            'ImportDeclaration[importKind=type]'(node) {
                const typeToken = sourceCode.getFirstToken(node, { skip: 1 });
                const punctuatorToken = sourceCode.getTokenAfter(typeToken);
                const spacesBetweenTypeAndPunctuator = punctuatorToken.range[0] - typeToken.range[1];
                if (after && spacesBetweenTypeAndPunctuator === 0) {
                    context.report({
                        loc: punctuatorToken.loc,
                        messageId: 'expectedBefore',
                        data: { value: punctuatorToken.value },
                        fix(fixer) {
                            return fixer.insertTextBefore(punctuatorToken, ' ');
                        },
                    });
                }
                if (!after && spacesBetweenTypeAndPunctuator > 0) {
                    context.report({
                        loc: punctuatorToken.loc,
                        messageId: 'unexpectedBefore',
                        data: { value: punctuatorToken.value },
                        fix(fixer) {
                            return fixer.removeRange([
                                typeToken.range[1],
                                typeToken.range[1] + spacesBetweenTypeAndPunctuator,
                            ]);
                        },
                    });
                }
            } });
    },
});
//# sourceMappingURL=keyword-spacing.js.map