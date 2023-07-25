use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn pow(x: i32, y: i32) -> i32 {
    let mut y = y - 1;
    let mut result = x;

    log(&format!("result: {}", result));

    while y > 0 {
        result *= x;
        y -= 1;

        log(&format!("result: {}", result));
    }

    log(&format!("result: {}", result));

    result
}
