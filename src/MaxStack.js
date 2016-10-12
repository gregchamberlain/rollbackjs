class MaxStack {
  constructor(max = 5) {
    this.max = max;
    this.stack = [];
  }

  push(val) {
    if (this.stack.length === this.max) this.stack.shift();
    return this.stack.push(val);
  }

  pop() {
    return this.stack.pop();
  }

}

export default MaxStack;
