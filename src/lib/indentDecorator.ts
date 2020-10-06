/**
 * NOTE: Use browser console
 *
 * @playground <https://tsplay.dev/KwXOOW>
 */

//#region Declarations

export type RealNumber = Number & Partial<{__brand?: null}>

export interface Indentable
{
    indent?: RealNumber;
    // indent?: number;
}

type TFunction = (...args: any[]) => any;

//#endregion Declarations

//#region Util/Vars

export function assertIndentLevelIsReal(obj: unknown): asserts obj is RealNumber
{
    if(typeof obj === 'number' && Number.isInteger(obj) && obj >= 0) return

    throw new Error('Indent value can not be an integer under 0.')
}

export function indentAmountToString(char: string, level: number): string;
export function indentAmountToString(char: string, level: RealNumber): string
export function indentAmountToString(char: string = base.char, level: RealNumber | number): string
{ return char.repeat(level as number) };

export const base =
{
    char:       ' ',
    amount:     0,
    increment:  2
} as const;

export function bakeIndentInMethod<
    T extends Indentable,
    F extends (...args: any[]) => any>
  (
    originalFunction: F,
    level: number
  ): F {
    return function (this: T, ...args: Parameters<F>)
    {
        const initial = this.indent!;
        this.indent = level;

        return (returned => {
            this.indent = initial;
            return returned;
        })(originalFunction.apply(this, args))
    } as F;
}

//#endregion Util/Vars

//#region Decorator

export function indent<C extends Indentable>(level: number)
{
    assertIndentLevelIsReal(level)
    return function(target: Object, propertyKey: string, descriptor: any & {value: any})
    {
        const originalMethod = descriptor.value; // save a reference to the original method

        // NOTE: Do not use arrow syntax here. Use a function expression in
        // order to use the correct value of `this` in this method (see notes below)
        Object.assign(
            descriptor,
            {value: bakeIndentInMethod<C, typeof originalMethod>(originalMethod, level)} )

        return descriptor;
    }
}

//#endregion Decorator
