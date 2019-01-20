---
title: webpack源码学习
---

## webpack的执行流程

```
webpack
 |
WebpackOptionsDefaulter
 |
Compiler(Tapalbe) --
          |
          this.hooks = {
            shouldEmit: new SyncBailHook(["compilation"]),
            done: new AsyncSeriesHook(["stats"]),
            additionalPass: new AsyncSeriesHook([]),
            beforeRun: new AsyncSeriesHook(["compiler"]),

            run: new AsyncSeriesHook(["compiler"]),
            emit: new AsyncSeriesHook(["compilation"]),
            afterEmit: new AsyncSeriesHook(["compilation"]),

            thisCompilation: new SyncHook(["compilation", "params"]),
            compilation: new SyncHook(["compilation", "params"]),
            normalModuleFactory: new SyncHook(["normalModuleFactory"]),
            contextModuleFactory: new SyncHook(["contextModulefactory"]),

            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            make: new AsyncParallelHook(["compilation"]),
            afterCompile: new AsyncSeriesHook(["compilation"]),

            watchRun: new AsyncSeriesHook(["compiler"]),
            failed: new SyncHook(["error"]),
            invalid: new SyncHook(["filename", "changeTime"]),
            watchClose: new SyncHook([]),

            // TODO the following hooks are weirdly located here
            // TODO move them for webpack 5
            environment: new SyncHook([]),
            afterEnvironment: new SyncHook([]),
            afterPlugins: new SyncHook(["compiler"]),
            afterResolvers: new SyncHook(["compiler"]),
            entryOption: new SyncBailHook(["context", "entry"])
        };
```