/**
* classes to represent a doubly linked list with respective nodes for schedules
* @version December 20th, 2021
* @authors Logan Cover
**/
function LinkedList(head = null) {
  this.head = head;
  this.tail = head;
}

LinkedList.prototype = {
  append : function(node) {
if(node != null || node != undefined) {
    if(this.head == null) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
    }
  },
  getLast : function() {
      return this.tail;
  },
  size : function() {
    var s = 0;
    var h = this.head;
    while(h != null) {
      s++;
      h = h.next;
    }
    return s;
  }
}

class Node {
  constructor(name, id, std, st, etd, et, isChild = true, sub = null, idx = -1, dot = null) {
    this.next = null;
    this.previous = null;

    this.name = name;
    this.ID = id;
    this.startTimeDigits = std;
    this.startTime = st;
    this.endTimeDigits = etd;
    this.endTime = et;
    this.isChild = isChild;
    this.intraschedule = sub;
    this.intraindex = idx;
    this.dot = dot;

  }
}
