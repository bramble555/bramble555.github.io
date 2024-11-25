# Java细节

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