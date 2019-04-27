---
layout: post
title: Threaded Woes
categories: [java]
---

## The Problem

I'd been banging my head on these logging entries for days. Our recently added audit logs had a frustrating phenomenon; these unrelated strings were ending up in the "object" field when we shouldn't have a value populated there at all.

Working with Spring, mind you, the class looked something like this:

{% highlight java %}
{% raw %}
@Component
public class AuditLogger {
    @Autowired
    private Logger logger;

    public void logSuccessfulLogin(String attemptedUsername) {
      addCommand("login");
      addUser(attemptedUsername);
      addResult("success");
      log();
    }

    public void logFailedLogin(String attemptedUsername) {
      addCommand("login");
      addUser(attemptedUsername);
      addResult("failed");
      log();
    }

    public void logNonExistantAccessAttempt(String uri, String username) {
      addCommand("non_existant_access");
      addUser(username);
      addObject(uri);
      addResult("failed");
      log();
    }

    // -- private helper methods

    private void addObject(String value) {
      MDC.put("object", value);
    }

    private void addCommand(String value) {
      MDC.put("command", value);
    }

    private void addResult(String value) {
      MDC.put("result", value);
    }

    private void addUser(String value) {
      MDC.put("username", value);
    }

    private void log() {
      // Everything in the log line itself is populated from the MDC based on
      // the log4j configuration; nothing actually needs to be explicitly logged here
      logger.info("");
    }
}
{% endraw %}
{% endhighlight %}

Unfortunately, the log entries were coming out with values from prior log entries, as such:

{% highlight log %}
{% raw %}
2017/06/25 09:02:12 | INFO | command = login, result = success, user = jenny98
2017/06/25 09:02:19 | INFO | command = login, result = failure, user = hacker5
2017/06/25 09:02:25 | INFO | command = non_existant_access, result = failed, user = robert.d.johnson, object = /api/lookup?id=1103725
2017/06/25 09:02:27 | INFO | command = login, result = success, user = orangeuser12, object = /api/lookup?id=1103725
{% endraw %}
{% endhighlight %}

Notice the last line, which has the same 'object' shown as the prior log line, even though the 'login' type log entry (populated by 'logSuccessfulLogin' method) doesn't add an 'object' attribute at all.

## The Solution

[MDC](https://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/MDC.html) is a thread-safe log4j utility, but it persists for the life of a thread, much like Java's thread-local. Of course, if the thread goes back into a threadpool and gets reused, there's nothing to clear out the contents of the MDC, which means that the previously added attributes stick around and are logged, even though they aren't logically relevant.

The fix here for me was easier than perhaps I expected; all I had to do was clear out the contents of the MDC after the logging was complete.

{% highlight java %}
{% raw %}
private void log() {
  // Everything in the log line itself is populated from the MDC based on
  // the log4j configuration; nothing actually needs to be explicitly logged here
  logger.info("");

  // Clear out the MDC contents so that if the thread is reused by the thread pool,
  // or if the logging is called for a second time within the same thread,
  // the MDC is in a clean state.
  MDC.clear();
}
{% endraw %}
{% endhighlight %}
