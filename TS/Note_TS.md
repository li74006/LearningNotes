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

## Generics

### 1 : Introduction

### 2 : Understanding the Problem

### 3 : Generic(泛型) Classes

```ts
class KeyValuePair<T> {
  constructor(public key: T, public value: string) {}
}

let pair = new KeyValuePair<string>("1", "a");
// 也可以不在 < > 中声明类型，编译器会根据填写的参数类型自动赋类。
```

### 4 : Generic Functions

```ts
class ArrayUtils {
  static wrapInArry<T>(value: T) {
    return [value];
  }
}

let numbers = ArrayUtils.wrapInWrap(1);
```

### 5 : Generic Interfaces

```ts
interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

interface User {
  username: string;
}

interface Product {
  title: string;
}

let result = fetch<User>("url");
let result = fetch<Product>("url");
```

### 6 : Generic Constraints(约束)

```ts
function echo<T extends number | string>(value: T): T {
  return value;
}
// 将其限制为 number 或者 string

// 或者在 extends 后面加个对象进行限制
function echo<T extends { name: string }>(value: T): T {
  return value;
}

// 或者写一个 interface 进行限制
interface Person {
  name: string;
}

function echo<T extends Person>(value: T): T {
  return value;
}

// 或者用 class进行限制
class Person {
  constructor(public name: string) {}
}

class Customer extends Person {}

function echo<T extends Person>(value: T): T {
  return value;
}

echo(new Customer("a"));
// 或
echo(new Person("a"));
```

### 7 : Extending(扩展) Generic Classes

```ts
class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._object.push(obj);
  }
}

class CompressibleStore<T> extends Store<T> {
  compress() {}
}

let store = new CompressibleStore<Product>();
store.compress();

// 限制了泛型的参数
class SearchableStore<T extends { name: string }> extends Store<T> {
  find(name: string): T | undefined {
    return this._objects.find((obj) => obj.name === name);
  }
}
```

### 8 ： The keyof Operator

```ts
class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._object.push(obj);
  }

  find(property: keyof T, value: unknow): T | undefined {
    return this._object.find((obj) => obj[property] === value);
  }
}

let store = new Store<Product>();
store.add({ name: "a", price: 1 });
store.find("name", "a");
store.find("price", 1);
store.find("noExistingProperty", 1);
// 如果上面 find 方法中，不用 keyof,当下面的 find 方法查询不存在参数的时候，就会报 bug 了。
```

### 9 ： Type Mapping

```ts
interface Product {
  name: string;
  price: number;
}

type ReadOnlyProduct = {
  readonly [K in keyof Product]: Product[K];
};

// 当遇到泛型的时候
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

// 更多类型详见 TS官方文档 的 typescript utility types

let product: ReadOnly<Product> = {
  name: "a",
  price: 1,
};
```

## Decorators(装饰器)

### 1 : Introduction

### 2 : What Are Decorators

- "experimentalDecorators"：是否启用装饰器。

> 装饰器：就是一个在 js 运行期间被调用的函数。

### 3 : Class Decorators

```ts
function Component(constructor: Function) {
  console.log("Component decorator called");
  constructor.prototype.uniqueId = Date.now();
  constructor.prototype.insertInDom = () => {
    console.log("Inserting the component in the DOM");
  };
}

@Component
class ProfileComponent {}
```

### 4 : Parameterized(参数化的) Decorators

```ts
type ComponentOptions = {
  selector: string;
};

function Component(options: ComponentOptions) {
  return (constructor: Function) => {
    console.log("Component decorator called");
    constructor.prototype.options = options;
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.insertInDom = () => {
      console.log("Inserting the component in the DOM");
    };
  };
}

@Component({ selector: "#my-profile" })
class ProfileComponent {}
```

### 5 : Decorator Composition(组成)

```ts
// 接上节

function Pipe(constructor: Function) {
  console.log("Pipe decorator called");
  constructor.prototype.pipe = true;
}

@Component({ selector: "my-profile" })
@Pipe
class ProfileComponent {}
// 先执行 Pipe，再执行Component。
```

### 6 : Method Decorators

```ts
function Log(target: any, methodName: string, descriptor: ropertyDescriptor) {
  const original = descriptor.value as Function;
  descriptor.value = function (...args: any) {
    console.log("Before");
    original.call(this, ...args);
    console.log("After");
  };
}

class Person {
  @Log
  say(message: string) {
    console.log("Person says" + message);
  }
}

let person = new Person();
person.say("Hello");
```

### 7 : Accessor(存取器) Decorators - Title

```ts
function Capitalize(target: any, methodName: string, descriptor: PropertyDescriptor:){
  const original = descriptor.get;
  descriptor.get = function(){
    const result = original?.call(this)
    // 上面一句 ? 的意思是，if(original !== null && origianl !== undefined) 然后 origianl.call(this);
    if(typeof result === 'string') ? result.toUpperCase() : result；

  }
}

class Person {
  constructor(public firstName: string, public lastName: string){
    get fullName(){

      @Capitalize
      return `${this.firstName} ${this.lastName}`;
    }
  }
}
```

### 8 ： Property Decorators

```ts
function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;

    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length)
          throw new Error(
            `${propertyName} should be at least ${length} characters long.`
          );
        value = newValue;
      },
    };

    Object.defineProperty(target, propertyName, descriptor);
  };
}

class User {
  @MinLength(4)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

let user = new User("1234");
console.log(user.password);
```

### 9 : Parameter Decorators

```ts
type WatchParameter = {
  methodName: string,
  parameterIndex: number,
}

const watchedParameter[] = [];

function Watch(target: any, methodName: string, parameterIndex: number) {
  watchedParameter.push(
    methodName,
    parameterIndex
  )
}

class Vehicle {
  move(@Watch speed: number) {}
}

console.log(watchedParameter);
```

## Modules

### 1 : Introduction

### 2 : Exporting and Importing

```ts
// 在 './shapes' 想要暴露的对象前面加 export 就行。

import { Circle, Square } from "./shapes";
// 可以在 { } 中使用 Ctrl + Space ,就能看到所有从 shapes 中暴露出来的 object
// 如果 { } 中有不想使用的引入对象，可以用 Ctrl + . ,选 Remove unused... 就可以将其移除。
```

### 3 : Module Formats

### 4 : Default Exports

### 5 : Wildcard(通配符) Imports

```ts
import * as Shapes from "./shapes";
```

### 6 : Re-exporting

## Integration with JavaScript

### 1 : Introduction

### 2 : Including JS Code in TS Projects

- "allowJs"：是否允许引入 JS。

### 3 ： Type Checking JS Code

- "checkJs": 是否对 JS 进行类型检查。

> 开启对 JS 类型检查后，可以在 JS 文件中加入特殊注释：// @ts-nocheck ，来取消 TS 对引入 JS 的类型检查。

### 4 : Describing Types Using JSDoc

```js
// 在 JS 中添加：
/**
 * Calculates income tax. 还可以在里面写注释
 * @param {number} income -这里也可以写注释
 * @returns {number}
 */
```

### 5 : Creating Declaration Files

除了上一节添加标注的方法之外，还可以为需要注释的文件创建的同名的注释文件（tax.d.ts)。

```ts
export declare function calculateTax(income: number): number;
```

### 6 : Using Definitely Typed Declaration Files

例如纯 JS 写的 lodash，在 TS 中就无法引入，所以使用 Definitely Typed ，仓库提供了用 TS 写好的主流库。

> npm i -D @types/lodash

## React with TypeScript

### 1 : Introduction

### 2 : Creating a React App with TypeScript

### 3 : Adding Bootstrap

### 4 : Creating a Component - Title

### 5 : Using the State Hook

### 6 : Calling the Backend

### 7 : Using the Effect Hook

### 8 : Handling Events

### 9 : Building a Form

### 10 : Handling Form Submission

## Node and Express with TypeScript

### 1 : Introduction

### 2 : Executing TypeScript Code with Node

```
npm init -y
npm i -D ts-node 或 // npm i -g ts-node

// 然后在 package.json 中，将 "scripts" 下原有内容换为 "start": "ts-node index.ts"

npm start
```

### 3 : Setting up an Express Project

```ts
npm i express
npm i -D typescript @types/node @types/express
tsc --init

import express from 'express';
const app = express();
app.listin(8000, () => console.log('Server started'));
```

### 4 : Creating a Basic Route

```ts
import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listin(8000, () => console.log("Server started"));
```

### 5 : Creating a Router

```ts
// 新建 reminders.ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("List of reminders");
});

export default router;
```

```ts
import express from "express";
const app = express();
import remindersRouter from "./routers/reminders";

app.use("/reminders", remindersRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listin(8000, () => console.log("Server started"));
```

### 6 : Parsing Request Bodies

```ts
// 接上节 reminders.ts

// DTO 是 Data Tarnsfer Object，是客户端发送给服务器的对象。
interface CreateReminderDto {
  title: string;
}

router.post("/", (req, res) => {
  const { title } = req.body as CreateReminderDto;
  res.json(title);
});
```

### 7 : Building an API

```ts
// 新建 reminder.ts
export default class Reminder {
  id: number;
  isCompleted: boolean;

  constructor(pubuli title: string) {
    this.id = Date.now();
    this.isComplete = false;
  }
}
```

```ts
// 接上节 reminders.ts

interface CreateReminderDto {
  title: string;
} // 这个接口已经抽到另一个模块去了，懒了就不仔细记录了。

const reminders: Reminder[] = [];

router.post("/", (req, res) => {
  const { title } = req.body as CreateReminderDto;
  const reminder = new Reminder(title);
  reminders.push(reminder);
  res.status(201).json(reminder);
});
```
