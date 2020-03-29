# 记录日常阅读 CSS 相关的网络文章

## 🌧 2020-03-29 星期日 5℃

### 1️⃣ [认真介绍 CSS 原理-code秘密花园](https://mp.weixin.qq.com/s/ngOdEF8_4l3Pz_rOLE3n8w)

- 浏览器渲染过程：
  ```
                        DOM
                        ↓
  HTML =(HTMLParser)=> DOMTree      Layout
                        ↓            ↕
                    Attachment => RenderTree => Painting => Display
                        ↑
  CSS =(CSSParser)=> StyleRules
  ```
- Webkit CSS 解析器
  - 浏览器 CSS 模块负责 CSS 脚本解析，并为每个 Element 计算出样式。
  - CSS 模块在实现上有几个特点：
    - CSS 对象众多（颗粒小而多）
    - 计算频繁（为每个 Element 计算样式）
  - Webkit 使用 Flex 和 Bison 解析生成器从 CSS 语法文件中自动生成解析器。
  - 解析器将每个 CSS 文件解析为样式表对象
    ```scss
    // Element Property    value
    //   ↓      ↓            ↓
        h2 { margin: 12px 6px 18px 6px; }
    //       |<-----Declaration------>|
    //  |<------------Rule------------->|
    ```
  - Webkit 使用了自动代码生成工具生成了相应的代码，
    - 也就是说 **词法分析** 和 **语法分析** 部分代码是自动生成的
  - `createStyleRule()` 函数将在一般性的规则需要被建立的时候调用:
    ```cpp
    CSSRule* CSSParser::createStyleRule(CSSSelector* selector)  
    {  
        CSSStyleRule* rule = 0;  
        if (selector) {  
            rule = new CSSStyleRule(styleElement);  
            m_parsedStyleObjects.append(rule);  
            rule->setSelector(sinkFloatingSelector(selector));  
            rule->setDeclaration(new CSSMutableStyleDeclaration(
              rule, parsedProperties, numParsedProperties
            ));  
        }  
        clearProperties();  
        return rule;  
    }
    ```
  - 通过调用 CSSStyleSheet 的 parseString 函数，将上述 CSS 解析过程启动，
    - 解析完一遍后，把 Rule 都存储在对应的 CSSStyleSheet 对象中；
  - 由于目前规则依然是不易于处理的，还需要将之转换成 CSSRuleSet。
    - 也就是将所有的纯样式规则存储在对应的集合当中，这种集合的抽象就是 CSSRuleSet；
  - CSSRuleSet 提供了一个 addRulesFromSheet 方法，
    - 能将 CSSStyleSheet 中的 rule 转换为 CSSRuleSet 中的 rule
  - 基于这些个 CSSRuleSet 来决定每个页面中的元素的样式
- CSS 选择器解析顺序
  - HTML 经过解析生成 DOM Tree；而在 CSS 解析完毕后，
    需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，
    最终用来进行绘图。
  - 在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 renderer。
- CSS 语法解析过程：
  1. 先创建 CSSStyleSheet 对象。将 CSSStyleSheet 对象的指针存储到 CSSParser 对象中。
  2. CSSParser 识别出一个 simple-selector ，形如 “div” 或者 “.class”。创建一个 CSSParserSelector 对象。
  3. CSSParser 识别出一个关系符和另一个 simple-selecotr ，那么修改之前创建的 simple-selecotr, 创建组合关系符。
  4. 循环第3步直至碰到逗号或者左大括号。
  5. 如果碰到逗号，那么取出 CSSParser 的 reuse vector，然后将堆栈尾部的 CSSParserSelector 对象弹出存入 Vecotr 中，最后跳转至第2步。如果碰到左大括号，那么跳转至第6步。
  6. 识别属性名称，将属性名称的 hash 值压入解释器堆栈。
  7. 识别属性值，创建 CSSParserValue 对象，并将 CSSParserValue 对象存入解释器堆栈。
  8. 将属性名称和属性值弹出栈，创建 CSSProperty 对象。并将 CSSProperty 对象存入 CSSParser 成员变量m_parsedProperties 中。
  9. 如果识别处属性名称，那么转至第6步。如果识别右大括号，那么转至第10步。
  10. 将 reuse vector 从堆栈中弹出，并创建 CSSStyleRule 对象。CSSStyleRule 对象的选择符就是 reuse vector, 样式值就是 CSSParser 的成员变量 m_parsedProperties 。
  11. 把 CSSStyleRule 添加到 CSSStyleSheet 中。
  12. 清空 CSSParser 内部缓存结果。
  13. 如果没有内容了，那么结束。否则跳转值第2步。

### 2️⃣ [CSS规范 - NEC : 更好的CSS样式解决方案 - 网易前端](http://nec.netease.com/standard/css-sort.html)

- 分类方法
- 命名规则
- 代码格式
- 优化方案
- 最佳实践
- 典型错误
