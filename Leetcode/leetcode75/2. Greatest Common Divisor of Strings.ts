function gcdOfStrings(str1: string, str2: string): string {
  // 声明变量
  let gcd = "";

  let str1Length = str1.length;
  let str2Length = str2.length;

  let longer = "";
  let shorter = "";

  let appr1: number[] = [];
  let appr2: number[] = [];
  let appr: number[] = [];

  // 1. 判断 str1、str2 谁更长
  if (str1Length >= str2Length) {
    longer = str1;
    shorter = str2;
  } else {
    longer = str2;
    shorter = str1;
  }

  // 2. 求 str1、str2 各自的约数
  for (let i = 0, j = 0; i <= longer.length || j <= shorter.length; i++, j++) {
    if (i <= longer.length) {
      if (longer.length % i === 0) appr1.push(i);
    }

    if (j <= shorter.length) {
      if (shorter.length % j === 0) appr2.push(j);
    }
  }

  // 3. 求 str1、str2 公约数
  for (let i of appr1) {
    for (let j of appr2) {
      if (i === j) appr.push(j);
    }
  }

  appr.reverse();

  // 4. 从最大公约数开始测试 longer 各个位的字符是否相等
  findGcd: for (let i = 0; i < appr.length; i++) {
    let strShorter = shorter.slice(0, appr[i]);
    let apprNow = appr[i];

    for (let j = 0; j + apprNow <= longer.length; j += apprNow) {
      if (longer.slice(j, j + apprNow) !== strShorter) {
        break;
      } else if (j + apprNow === longer.length) {
        gcd = strShorter;
        break findGcd;
      }
    }
  }

  // 5. 检测 shorter 能否被 gcd 整除
  if (gcd.length !== 0) {
    let temp = gcd;
    for (let i = 0; i + temp.length <= shorter.length; i += temp.length) {
      if (shorter.slice(i, i + temp.length) !== temp) {
        gcd = "";
        break;
      } else if (i + temp.length === shorter.length) {
        gcd = temp;
      }
    }
  }

  return gcd;
}

console.log(gcdOfStrings("ABCDEF", "ABC"));
