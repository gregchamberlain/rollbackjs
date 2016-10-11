import List from '../src/List';
import { isEqual } from 'lodash';

describe('List', () => {
  describe('#equals', () => {
    const list1 = new List([1,2,3,4]);
    const list2 = new List([1,2,3,4]);
    const list3 = new List([1,2,3]);
    it('returns true for Lists with equal state', () => {
      expect(list1.equals(list2)).toBe(true);
    })
    it('returns false for Lists with different state', () => {
      expect(list1.equals(list3)).toBe(false);
      expect(list1.equals([1,2,3])).toBe(false);
    });
  })
  describe('#push', () => {
    const list = new List([1,2,3]);
    const val = list.push(10, 11, 12);
    it('pushes an element on the end', () => {
      expect(list.get(5)).toBe(12);
    });
    it('returns the new length', () => {
      expect(val).toBe(6);
    });
    it('rollback returns the old state', () => {
      list.rollback();
      expect(list.get(3)).toBe(undefined);
    });
  });
  describe('#pop', () => {
    const list = new List([1,2,3]);
    const val = list.pop();
    it('returns the last element', () => {
      expect(val).toBe(3);
    });
    it('removes the last element', () => {
      expect(list.length()).toBe(2);
    });
    it('rollback returns old state', () => {
      list.rollback();
      expect(list.get(2)).toBe(3);
    });
  });
  describe('#set', () => {
    const list = new List([1,2,3]);
    list.set(0, 10);
    it('sets the index to the new value', () => {
      expect(list.get(0)).toBe(10);
    });
    it('rollback returns old state', () => {
      list.rollback();
      expect(list.get(0)).toBe(1);
    });
  });
});
