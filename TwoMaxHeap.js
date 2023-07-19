import java.util.ArrayList;
class Heap {
    constructor(numChildren) {
      if (numChildren < 2) {
        throw new Error("Number of children must be at least 2");
      }
      this.numChildren = numChildren;
      this.elements = [];
    }
  
    insert(element) {
      this.elements.push(element);
      this.heapifyUp(this.elements.length - 1);
    }
  
    popMax() {
      if (this.elements.length === 0) {
        throw new Error("Heap is empty");
      }
  
      const maxElement = this.elements[0];
      const lastElement = this.elements.pop();
  
      if (this.elements.length > 0) {
        this.elements[0] = lastElement;
        this.heapifyDown(0);
      }
  
      return maxElement;
    }
  
    heapifyUp(index) {
      const element = this.elements[index];
  
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / this.numChildren);
        const parent = this.elements[parentIndex];
  
        if (element <= parent) {
          break;
        }
  
        this.elements[index] = parent;
        index = parentIndex;
      }
  
      this.elements[index] = element;
    }
  
    heapifyDown(index) {
      const size = this.elements.length;
      const element = this.elements[index];
  
      while (true) {
        let maxChildIndex = null;
        let maxChild = null;
        const startChildIndex = this.numChildren * index + 1;
        const endChildIndex = Math.min(startChildIndex + this.numChildren, size);
  
        for (let i = startChildIndex; i < endChildIndex; i++) {
          if (maxChild === null || this.elements[i] > maxChild) {
            maxChildIndex = i;
            maxChild = this.elements[i];
          }
        }
  
        if (maxChildIndex === null || element >= maxChild) {
          break;
        }
  
        this.elements[index] = maxChild;
        index = maxChildIndex;
      }
  
      this.elements[index] = element;
    }
  }
  