## Getting Started with TypeScript

### 4 : Your First TS Program

使用：tsc（TS 编译器）命令，将写好的 ts 文件编译为 js 文件。

### 5 : Configuring the TS Compiler

使用 `tsc --init` 命令创建 ts 配置文件。
可在 tsconfig.json 文件中配置 ts。

- "rootDir"：设置配置文件存放目录。
- "outDir" ：设置 js 文件输出目录。
- "removeComments" ：可以移除所有 ts 评论，减小 js 代码体积。
- "noEmitOnError"：如果 ts 文件有错误，就不会将其生成为 js 文件。
- "sourceMap"：生成 sourceMap，会具体记录每条 ts 是如何转换为 js 的。

配置后，直接运行 `tsc` 命令即可。

### 6 : Debugging TS Applications

1. 点击侧边 Debug 图标。
2. 选择 create a launch.json file，再选 Node.js。
3. 在配置文件中加入 `"preLaunchTask": "tsc: build - tsconfig.json",`，回来点开始 Debug 的绿色按钮就行了。
4. 如果出现 cannot find "tsc: build - tsconfig.json" 的提醒，大概率是文件路径的问题。

## Fundamentals

### 2 : Built-in Types

基本数据类型：

- any
- unkonwn
- never
- enum
- tuple

TS 可以自动识别变量类型，所以可以注释类型，也可以不注释：

```ts
let sales: number = 123_456_789;
// 或
let course = "TypeScript";
```

### 3 : The any Type

定义一个函数的参数，参数没有确定类型的时候，可以将其设置为 any 类，否则会报错。

### 5 : Arrays

`let numbers: number[] =[];`

### 6 : Tuples

Tuples：是固定类型的 array，每个元素都有一个特别的类型。经常在成对的值的时候使用。

### 7 : Enums

Enums：代表着一个相关常数的列表。

```ts
enum Size {
  Small = 1,
  Medium,
  Large,
}
// enum 前面加 const，可以最优化编译结果。
let mySize: Size = Size.Medium;
```

### 8 : Functions

```ts
function calculateTax(income: number, taxYear = 2022): number {
  if (taxYear < 2022) return income * 1.2;
  return income * 1.3;
}

calculateTax(10_000, 2023);
```

- "noUnusedParameters": true, 可以检测没有用到的参数。
- "noImplicitReturns": true, 可以检测没有明确返回值，对其进行提醒。
- "noUnusedLocals": true, 可以检测声明了但未使用的变量。

### 9 : Objects

```ts
let employee: {
  readonly id: number; // 加了 readonly，id 就改不了以后。
  name: string;
  retire: (data: Date) => void;
} = {
  id: 1,
  name: "Lii",
  retire: (date: Date) => {
    console.log(date);
  },
};
```

## Advanced Types

### 2 : Type Aliases

```ts
tpye Employee = {
  readonly id: number,
  name: string,
  retire: (date: Date) => void
}
```

### 3 : Union Types

```ts
function kgToLbs(weight: number | string): number {
  // Narrowing👆
  if (typeof weight === "number") return weight * 2.2;
  else return parseInt(weight) * 2.2;
}
```

### 4 : Intersection(交叉) Types

```ts
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

let UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};
```

### 5 : Literal(字面量) Types

```ts
type Quantity = 50 | 100;
let quantity: Quantity = 100;
// 或
type Metric = "cm" | "inch";
```

### 6 : Nullable(空) Types

```ts
function greet(name: string | null | undefined) {
  if (name) console.log(name.toUpperCase());
  else console.log("Hola!");
}
```

### 7 : Optional Chaining

```ts
type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
console.log(customer?.birthday?.getFullYear());
```

### 8 : The Nullish Coaelscing Operator

```ts
let speed: number | null = null;
let ride = {
  speed: speed ?? 30,
  // 如果 speed 不是 null 或者 undefined，那就是 30。
};
```

### 9 : Type Assertions(声明)

```ts
let phone = document.getElementById("phone") as HTMLInputElement;
// 或
let phone = <HTMLInputElement>document.getElementById("phone");
```

### 10 : The unknown Type

参数: unknown

### 11 : The never Type

:never,告诉编译器某个函数不会有返回值，这样如果该函数后面还有操作，因为没有返回值，后面的操作不会进行，编译器就可以报 bug 了。

- "allowUnreachableCode": true, 可通过该配置项检测没法执行到的代码。

## Classes,Interfaces and Object-oriented Programming

### 1 : Introduction

### 2 : What is Object-oriented Programming

### 3 : Creating Classes

```ts
class Account {
  id: number,
  owner: string,
  balance: number;

  // 用构造器对参数进行初始
  constructor(id: number, owner: string, balacne: number){
    this.id = id;
    this.owner = owner;
    this.balance = balance;
  }

  // 还可以写一个 method，因为这个函数是在 class 中，所以叫他 method
deposit(amount: number): void{
  if(amount <= 0)
  throw new Error('Invalid amount');
  this.balance += amount;
}
}
```

### 4 : Creating Objects

```ts
// 接上一节创建的 class
let account = new Account(1, 'Ohcysp', 0);
account.deposit(100);
console.log(account.balance);
console.log(typeof balance); // 返回 Object
console.log(account instanceOf Account); // 返回 true
```

可以使用 `tsc && node dist/index.js 直接生成并运行 index.js

### 5 : Read-only and Optional Properties

可以在类的 properties （例如 上一节的 id） 前面加 readonly，这样在 new 出来的对象中就不会意外修改该参数了。

可以在类的 properties （例如 上一节的 owner） 后面加 ? ,代表该参数是可选参数。

### 6 ： Access Control Keywords

```ts
class Account {
  private _balacne: number,

  constructor(balacne: number){
    this._balance = balance;
  }

  getBalance(): number{
    return this._balacne
  }

  private getTotal(){}
}

let account = new Account(100);
console.log(account.getBalance());
```

### 7 ： Parameter Properties

```ts
class Account {
  nickname?: string;

  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {}
  // 这样就不用向之前那样创建 class 了，更加简洁。
}
```

### 8 ： Getters and Setters

getter: 从类中获得一个参数的方法。
setter: 设置值用的方法。

```ts
class Account {
  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) throw new Error("Invalid value");
    this._balance = value;
  }
}
```

### 9 : Index Signatures

```ts
class SeatAssignment {
  [seatNumber: string]: string;
}

let seats = new SeatAssignment();
seats.A1 = "Mosh"; // 等同于 seats['A1'] = 'Mosh'；
seats.A2 = "Ohcysp";
```

### 10 ： Static Members

```ts
class Ride {
  private static _activeRides: number = 0; // 前面加了 static 后，activeRides 就不基于 new 出来的每个 ride 独立存在，只是该类的一个单独实例。

  start() {
    Ride.activeRides++;
  }
  stop() {
    Ride.activeRides--;
  }

  static get activeRides() {
    return Ride._activeRides;
  }
}

console.log(Ride.activeRides);
```

### 11 ： Inheritance

```ts
class Person{
  constructor( public firstName: string, public lastName: string){}

  get fullNanme(){
      return this.firstName + ' ' +this.lastName；
    }

  walk(){
    console.log('Walking')
  }
}

class Student extends Person {
  constructor（public studentId: number, firstName: string, lastName: string）{
    super(firstName, lastName)
  }

  takeTest(){
    console.log('Taking a test')
  }
}

let student = new Student(1, 'Ohc', 'ysp');
```

### 12 : Method Overriding

```ts
// 接上一节
class Teacher extends Person {
  override get fullName() {
    return "Perfessor" + super.fullName; // 这里可以继承父类的方法，增强复用。
  }
}
```

- "noImplictOverride"：是否允许子类能与父类具有同名的方法。

### 13 : Polymorphism(多态)

```ts
// 接上节
printNames([new Student(1, "John", "Smith"), new Teacher("Ohc", "ysp")]);

function printNames(people: Person[]) {
  for (let person of people) console.log(person.fullName);
}
```

> Open Closed Principle: Classes should be open for extension and closed for modification.

### 14 : Private vs Protected Methods

private 不能被子类继承，protected 可以被子类继承，子类中可以写 this.foo(),来调用父类中的 foo() 方法，建议尽可能少的使用 protected 。

### 15 : Abstract Classes and Methods

```ts
abstract class Shape {
  // 前面加 abstract 告诉编译器父类没有准备好，得找个子类继续下去。
  constructor(public color: string) {}
  render() {}

  // 方法前面也可以加 abstract，写法如下：
  abstract render(): void;
  // 方法前面写 abstract，类前面就也得写 abstract，否则会报错
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  override runder(): void {
    console.log("Rendering a circle");
  }
}
```

### 16 ： Interfaces

```ts
abstract class Calendar {
  constructor(public name: string) {}

  abstract addEvent(): void;
  abstract removeEvent(): void;
}

// interface 中无法写 methods。
interface Calendar {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

interface CloudCalendar extends Calendar {
  sync(): void;
}

// 继承 interface 生成的类时，后面跟 implement，并且可以在点击下面 GoogleCalendar 后，使用快捷键 Ctrl + . ,快速导入父类方法等。
class GoogleCalendar implements Canendar {
  constructor(public name: string) {}

  addEvent(): void {
    throw new Error("Method not implemented");
  }
  removeEvent(): void {
    throw new Error("Method not implemented");
  }
}
```
