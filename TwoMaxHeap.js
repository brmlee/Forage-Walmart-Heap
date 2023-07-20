import java.util.ArrayList;
public class Heap<T extends Comparable<T>> {
    private final int childCount;
    private final ArrayList<T> data;

    public Heap(int childCount) {
        this.validateChildCount(childCount);
        this.childCount = childCount;
        this.data = new ArrayList<T>();
    }

    private void validateChildCount(int childCount) {
        // ensure childCount is valid
        // ensure childCount is greater than zero
        if (childCount <= 0) {
            throw new IllegalArgumentException("childCount must be greater than zero");
        }
        // ensure childCount is a power of 2
        double logChildCount = Math.log(childCount) / Math.log(2);
        if (Math.ceil(logChildCount) != Math.floor(logChildCount)) {
            throw new IllegalArgumentException("childCount must be a power of 2");
        }
    }

    public void insert(T item) {
        // insert an item into the heap
        data.add(item);
        int itemIndex = data.size() - 1;
        while (itemIndex > 0) {
            itemIndex = this.swapUp(itemIndex);
        }
    }

    private int swapUp(int childIndex) {
        // check a child against its parent, and swap it if necessary to satisfy heap property
        T childValue = data.get(childIndex);
        int parentIndex = (int) Math.floor((float) (childIndex - 1) / childCount);
        if (parentIndex >= 0) {
            T parentValue = data.get(parentIndex);
            if (childValue.compareTo(parentValue) > 0) {
                data.set(parentIndex, childValue);
                data.set(childIndex, parentValue);
                return parentIndex;
            }
        }
        return -1;
    }

    public T popMax() {
        // pop the max value off the heap, return null if none remain
        if (data.size() > 0) {
            T maxItem = data.get(0);
            if (data.size() > 1) {
                T lastItem = data.remove(data.size() - 1);
                data.set(0, lastItem);
                int itemIndex = 0;
                while (itemIndex >= 0) {
                    itemIndex = this.swapDown(itemIndex);
                }
            }
            return maxItem;
        } else {
            return null;
        }
    }

    private int swapDown(int parentIndex) {
        // check a parent against all children and swap it with the highest child if necessary to satisfy heap property
        T parentValue = data.get(parentIndex);
        // determine largest child
        int largestChildIndex = 0;
        T largestChildValue = null;
        for (int i = 0; i < childCount; i++) {
            int childIndex = childCount * parentIndex + i + 1;
            if (childIndex < data.size() - 1) {
                T childValue = data.get(childIndex);
                if (largestChildValue == null || childValue.compareTo(largestChildValue) > 0) {
                    largestChildIndex = childIndex;
                    largestChildValue = childValue;
                }
            }
        }
        // perform swap if necessary
        if (largestChildValue != null && parentValue.compareTo(largestChildValue) < 0) {
            data.set(parentIndex, largestChildValue);
            data.set(largestChildIndex, parentValue);
            return largestChildIndex;
        }
        return -1;
    }
}
// class Heap {
//     constructor(numChildren) {
//       if (numChildren < 2) {
//         throw new Error("Number of children must be at least 2");
//       }
//       this.numChildren = numChildren;
//       this.elements = [];
//     }
  
//     insert(element) {
//       this.elements.push(element);
//       this.heapifyUp(this.elements.length - 1);
//     }
  
//     popMax() {
//       if (this.elements.length === 0) {
//         throw new Error("Heap is empty");
//       }
  
//       const maxElement = this.elements[0];
//       const lastElement = this.elements.pop();
  
//       if (this.elements.length > 0) {
//         this.elements[0] = lastElement;
//         this.heapifyDown(0);
//       }
  
//       return maxElement;
//     }
  
//     heapifyUp(index) {
//       const element = this.elements[index];
  
//       while (index > 0) {
//         const parentIndex = Math.floor((index - 1) / this.numChildren);
//         const parent = this.elements[parentIndex];
  
//         if (element <= parent) {
//           break;
//         }
  
//         this.elements[index] = parent;
//         index = parentIndex;
//       }
  
//       this.elements[index] = element;
//     }
  
//     heapifyDown(index) {
//       const size = this.elements.length;
//       const element = this.elements[index];
  
//       while (true) {
//         let maxChildIndex = null;
//         let maxChild = null;
//         const startChildIndex = this.numChildren * index + 1;
//         const endChildIndex = Math.min(startChildIndex + this.numChildren, size);
  
//         for (let i = startChildIndex; i < endChildIndex; i++) {
//           if (maxChild === null || this.elements[i] > maxChild) {
//             maxChildIndex = i;
//             maxChild = this.elements[i];
//           }
//         }
  
//         if (maxChildIndex === null || element >= maxChild) {
//           break;
//         }
  
//         this.elements[index] = maxChild;
//         index = maxChildIndex;
//       }
  
//       this.elements[index] = element;
//     }
//   }
  