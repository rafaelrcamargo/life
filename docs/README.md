# Life

Life or GOL (Game of Life) is a cellular automaton devised by the British mathematician John Horton Conway in 1970.

> To be completely honest, I wasn't expecting such a entertaining result...

## Rules

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Next steps

- [x] Add a UI
- [ ] Benchmark
- [ ] Port thing to Rust using `wasm-pack`
  - [ ] Benchmark agains TS
  - [x] Setup basic WASM project
- [ ] Check the rules and edge cases

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [LifeWiki](https://conwaylife.com/wiki/Tutorials)
