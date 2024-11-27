# Java源码

### HashMap

#### hash方法的原理：

JDK8中的实现：

````
static final int hash(Object key) {
    int h;
    return h == null ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}

````

