---
title: Git branching
tags: ["post", "short", "code", "git"]
---

- [Trunk based development](#trunk-based-development)
- [+ friends](#+-friends)
- [Multiple branching model](#multiple-branching-model)

---

## Trunk based development

A branching model where developers collaborate on code in a single release
branch called **trunk**. Together with short-lived branches, the system
minimizes conflicts and incentivises better feature chunking and parallel work.

```text
+--------+
|  main  |
+--------+
   ^
   |    +-------------------------+
   |<---+  feat/login-form        |
   |    +-------------------------+
   |
   |    +-------------------------+
   \<---+  fix/login-remember-me  |
        +-------------------------+
```

## + friends

- Bottom-up, one way code flow
- No divirging branches

```text
+--------------+
|  main        |
+--------------+
   ^
   |  +--------------+
   \--+  staging     |
      +--------------+
         ^
         |  +---------------+
         \--+  development  |
            +---------------+
               ^   
               |   +-------------------------+
               |<--+  feat/login-form        |
               |   +-------------------------+
               |
               |   +-------------------------+
               \<--+  fix/login-remember-me  |
                   +-------------------------+
```

Incentivises and strengthens other practices:

- [**Continuous integration**][1] and [**Continuous Delivery**][2] need to be
  properly implemented, and continuously improved, to get the speed and
  confidence that the code gets to the right place without errors
- **Testing** is upgraded to first-class-citizen in order to reliably deploy
  multiple times per day

Big impact tools:

- Automated versioning and release notes with [**Semantic Release**][3] based on
  [**Conventional Commit**][4] messages closes the fully automated deployment
  cycle, leaving developers only focus on code

[1]: https://en.wikipedia.org/wiki/Continuous_integration
[2]: https://en.wikipedia.org/wiki/Continuous_delivery
[3]: https://github.com/semantic-release/semantic-release
[4]: https://www.conventionalcommits.org

## Multiple branching model

- Still keep short-lived feature branches
- Each _release_ branch is mapped 1:1 to it's corresponding deployment
  environment
- Automate, with `semantic-release`, version, CHANGELOG and releases for
  `master`, `stage` and `develop`
- Everything is automated while still having the finger on the trigger: `git
  merge` from `develop` into `stage` and from `stage` into `master`. Each CI
  build is idempotent and isolated, with each branch having it's own set of CI
  vars.

---

Star Trek: S5 E2 Darmok

Dathon - Tamarian captain

Darmok on the ocean, Darmok and Jalad at Tanagra, Darmok and Jalad on the ocean

Jalad on the ocean
Darmok on the ocean

Darmok and Jalad at Tanagra
  - two people fighting together against a common enemy

Darmok and Jalad on the ocean

Temba, his arms wide
 - give something

Temba. His arms open
 - generosity, giving

Temba, at rest
 - stay as is, keep

Zinda, His face black, His eye red
 - dieing

Calimas at Bahar

... at El-Adrel
Kira at Bashi

Shaka(other captain). When the walls fell.
 - defeat


Gilgamesh and Enkidu, at Uruk

---

Temarc, the river Temarc! In winter.

Sokath (Picard)! His eye open.
