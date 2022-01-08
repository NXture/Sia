# Checker Package

The checker package contains modules which include checkings.

## Modules

### Is it Down

Ping domain names and give you the online state.

#### Usage

```
(en-US) "Are github.com, an-awesome-domain-name.net and twitter.com down?"
...
```

### Have I Been Pwned

Verify if one or several email addresses have been pwned (thanks to [Have I Been Pwned](https://haveibeenpwned.com/).

#### Usage

1. Since the API v3, you must [claim your API key](https://haveibeenpwned.com/API/Key).
2. Then paste it in `packages/checker/config/config.json` at the `haveibeenpwned.api_key` key.

```
(en-US) "Has varunsrivatsa27@gmail.com been pwned?"
(en-US) "Have iifeoluwa.ao@gmail.com, varunsrivatsa27@gmail.com, and supercleanemail@test.com been pwned?"
```

You can also predefine one or several email addresses in the `packages/checker/config/config.json` file at the `haveibeenpwned.emails` key.

If you do, then you can use such sentences:

```
(en-US) "Have my email addresses been pwned?"

```
