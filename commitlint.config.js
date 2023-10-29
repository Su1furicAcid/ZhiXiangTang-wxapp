module.exports = {
  // commitlint 规则 https://commitlint.js.org/#/reference-rules
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "scope-max-length": [2, "always", 15],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-max-length": [2, "always", 25],
    "subject-empty": [2, "never"],
    "type-case": [2, "always", ["lower-case", "pascal-case"]],
    "type-empty": [2, "never"],
    "type-enum": [2, "always", ["feat", "update", "fix", "refactor", "docs", "style", "test", "conf", "chore", "perf"]]
  },
  prompt: {
    settings: {},
    messages: {
      skip: "可选",
      max: "最多 %d 字符",
      min: "至少 %d 字符",
      emptyWarning: "该部分不能为空",
      upperLimitWarning: "超出限制",
      lowerLimitWarning: "低于限制"
    },
    questions: {
      type: {
        description: "选择本次提交的类型",
        enum: {
          feat: {
            description: "添加新的功能",
            title: "Features",
            emoji: "✨"
          },
          update: {
            description: "功能更新，指对已有功能的更新，甚至删除",
            title: "Updates",
            emoji: "💡"
          },
          fix: {
            description: "修复 bug",
            title: "Bug Fixes",
            emoji: "🐛"
          },
          refactor: {
            description: "代码重构，包括优化代码性能、可读性和逻辑结构的修改。代码大幅改动而外在行为不变",
            title: "Code Refactoring",
            emoji: "📦"
          },
          docs: {
            description:
              "文档修改，包括 .md 文档文件以及代码注释的添加、修改。如果是代码改动伴随的文档改动，则不属于此类型",
            title: "Documentation",
            emoji: "📄"
          },
          style: {
            description: "格式修改，比如改变缩进、空格，删除多余的空行，补上漏掉的分号等。是不改变代码主体的改动",
            title: "Styles",
            emoji: "💎"
          },
          test: {
            description: "测试文件的修改",
            title: "Tests",
            emoji: "🚨"
          },
          conf: {
            description: "配置的修改，修改对象一般为非程序文件，或程序文件中的字符串",
            title: "Configs",
            emoji: "⚙️"
          },
          chore: {
            description: "事务性的修改，包括文件的移动归类、更换依赖库、数据库类型，以及项目对接、部署时产生的改动等",
            title: "Chores",
            emoji: "♻️"
          },
          perf: {
            description: "性能优化，包括对代码执行效率、资源加载效率的优化等",
            title: "Performance",
            emoji: "📈"
          }
        }
      },
      scope: {
        description: "本次提交的范围（比如一个模块一个组件一个文件）"
      },
      subject: {
        description: "本次提交的简要描述"
      },
      body: {
        description: "本次提交的具体内容"
      },
      isBreaking: {
        description: "本次提交是否包括破坏性改动，导致以往部分代码/接口/写法不可用"
      },
      breakingBody: {
        description: "请在此处详细描述破坏性改动的具体内容，包括遗弃写法、接口、代码的相关替代方案等"
      },
      breaking: {
        description: "请在此处简要说明做了哪些破坏性改动"
      },
      isIssueAffected: {
        description: "本次提交是否要关闭相关的 issue"
      },
      issuesBody: {
        description: "请详细描述关闭的 issue 内容，包括标题、描述等"
      },
      issues: {
        description: "请写出关闭的 issue 号，如“Close #12”、“Fixes #13, resolves #15”等"
      }
    }
  }
};