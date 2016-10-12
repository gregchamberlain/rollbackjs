import MaxStack from './MaxStack';

class List {
  constructor(state = []) {
    this.stack = new MaxStack(100);
    this.state = state;
  }

  forEach(func) {
    return this.state.forEach(func);
  }

  equals(list) {
    if (list.constructor.name !== 'List') return false;
    if (list.length() !== this.length()) return false;
    for (let i=0;i<list.length();i++) {
      if (list.get(i) !== this.get(i)) return false;
    }
    return true;
  }

  push(...val) {
    this.stack.push({ name: 'splice', data: [this.state.length - 1, val.length] });
    return this.state.push(...val);
  }

  pop() {
    const value = this.state.pop();
    if (value !== undefined) this.stack.push({ name: 'push', data: [value] });
    return value;
  }

  shift() {
    const value = this.state.shift();
    this.stack.push({ name: 'unshift', data: [value] });
    return value;
  }

  unshift(value) {
    this.stack.push({ name: 'shift', data: [] });
    return this.state.unshift(value);
  }

  get(index) {
    return this.state[index];
  }

  set(index, value) {
    this.stack.push({ name: 'set', data: {index, value: this.state[index]}});
    return this.state[index] = value;
  }

  splice(start, deleteCount, ...items) {
    const oldItems = this.state.splice(start, deleteCount, ...items);
    this.stack.push({ name: 'splice', data: [start, items.length, ...oldItems] })
    return oldItems;
  }

  length() {
    return this.state.length;
  }

  rollback() {
    const action = this.stack.pop();
    if (action.name === 'set') {
      this.state[action.data.index] = action.data.value
    } else {
      this.state[action.name](...action.data);
    }
    return this.state;
  }

  toString() {
    return 'Hello';
  }
}

export default List;
