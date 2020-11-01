use napi::{register_module, CallContext, JsNumber, Module, Result};
use napi_derive::js_function;
use std::convert::TryInto;

register_module!(fib, init);

fn init(module: &mut Module) -> Result<()> {
    module.create_named_method("fibonacci", fibonacci)?;

    Ok(())
}

#[js_function(1)]
fn fibonacci(ctx: CallContext) -> Result<JsNumber> {
    let n = ctx.get::<JsNumber>(0)?.try_into()?;
    ctx.env.create_int64(fibonacci_native(n))
}

#[inline]
fn fibonacci_native(n: i64) -> i64 {
    match n {
        1 | 2 => 1,
        _ => fibonacci_native(n - 1) + fibonacci_native(n - 2),
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_fibonacci_native() {
        assert_eq!(1, fibonacci_native(1));
        assert_eq!(1, fibonacci_native(2));
        assert_eq!(2, fibonacci_native(3));
        assert_eq!(3, fibonacci_native(4));
        assert_eq!(5, fibonacci_native(5));
        assert_eq!(8, fibonacci_native(6));
        assert_eq!(13, fibonacci_native(7));
    }
}
