# Java学习笔记

### ```expends```和```super```修饰符

今天在教程上看到了关于 ```expends```和```super```的细节。

``expends``是不支持写入的，但是支持读取。

例如 ``ArrayList<T expends Dog>``，它支持读取，因为每个元素肯定都是Dog或者是Dog的子类，
可以统一当成类 ``Dog`` 来处理。但是它不支持**add元素**，这是为什么呢？

经过朋友的指点之后，我才发现存在以下的一种特殊情况，使得如果 ``expend``允许add操作的话，会产生问题。

假设我们有一个 ``ArrayList<Animal> animalList`` ，然后我们进行下面的操作：
```java
ArrayList<T extends Dog> dogList = new ArrayList<>(1);
ArrayList<Animal> animalList = dogList;
animalList.add(new Cat());
```

此时就出错了！

上面的代码新建了一个狗狗列表，然后把它赋值给动物列表，这是合法的。因为狗狗列表可以直接被赋值给动物列表（Dog extends Animal）
但是此时我们注意到，对动物列表的值的修改会被同步到dogList中（因为 ``animalList = dogList;``）

那么此时就有安全问题：

如果我们往 ``animalList``内添加非Dog类型的元素会怎么样？比如：
```java
animalList.add(new Cat());
```
这当然是合法的。因为猫也是动物，所以猫可以被添加进动物列表。此时问题就来了，因为动物列表跟狗狗列表指向的是同一个对象，所以对动物列表
的修改会被同步到狗狗列表中，此时我们发现，狗狗列表中居然插入了猫！！！

这就是为什么使用 ``extends`` 后，无法支持add操作的原因。当它被赋值给另一个父类变量时，往那个父类变量中进行的add操作（假设可以）
会同步到这个变量，导致它内部出现了本不该有的元素。

同理，我们现在也可以解释为什么 ``super`` 上界修饰符不允许读取。
比如 ``ArrayList<T super Dog> dogList``
我们可以允许 ``dogList.add(new Animal())`` 的操作，因为动物的子类包含狗。就算像上面一样把它赋值给一个父类，也是符合 ``super Dog``的。

但是我们不可以读取， ``dogList.get(0)``是不可以的。因为我们无法确定读取出来的元素的类型。比如dogList中既有dog，也有哺乳类动物（狗是哺乳类动物的子类），
那么假如拿出来的是狗，我们调用了bark方法，让小狗汪汪叫，这是正常的，万一我们拿到的是抽象的哺乳类动物就会出错了，哺乳类动物可不一定都会汪汪叫哦！

综上，我们就可以知道为什么 ``extends`` 修饰的变量不允许添加，但允许读取。而 ``super`` 修饰的变量允许添加却不允许读取了。

### Java foreach陷阱

阿里面试官：为什么Java开发手册强制不要在 foreach 里进行元素删除？

#### 关于fail-fast

fail-fast 是一种通用的系统设计思想，一旦检测到可能会发生错误，就立马抛出异常，程序将不再往下执行。

如果想使用for-each来删除元素，不可以直接删除，如
```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

for (String str : list) {
	if ("沉默王二".equals(str)) {
		list.remove(str);
	}
}

System.out.println(list);
```

这样写会报错，因为也就是说，remove 的时候触发执行了 checkForComodification 方法，
该方法对 modCount 和 expectedModCount 进行了比较，发现两者不等，就抛出了 ConcurrentModificationException 异常。
应该使用Iterator或者stream。

```java
List<String> list = new ArrayList<>();
list.add("沉默王二");
list.add("沉默王三");
list.add("一个文章真特么有趣的程序员");

Iterator<String> itr = list.iterator();

while (itr.hasNext()) {
	String str = itr.next();
	if ("沉默王二".equals(str)) {
		itr.remove();
	}
}
```

Iterator的remove方法内部有重要的一行：
```java
public void remove() {
    if (lastRet < 0) // 如果没有上一个返回元素的索引，则抛出异常
        throw new IllegalStateException();
    checkForComodification(); // 检查 ArrayList 是否被修改过

    try {
        ArrayList.this.remove(lastRet); // 删除上一个返回元素
        cursor = lastRet; // 更新下一个元素的索引
        lastRet = -1; // 清空上一个返回元素的索引
        expectedModCount = modCount; // 更新 ArrayList 的修改次数
    } catch (IndexOutOfBoundsException ex) {
        throw new ConcurrentModificationException(); // 抛出异常
    }
}
```

其中的expectedModCount = modCount; // 更新 ArrayList 的修改次数
就避免了报错，并且会正确修改索引，不会导致有的元素被跳过。