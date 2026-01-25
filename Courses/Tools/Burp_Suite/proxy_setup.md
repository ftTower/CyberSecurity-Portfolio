# Burp Suite - Proxy Setup

## Pre-Configured Browser

In Burp's **(Proxy>Intercept)**, we can click on **Open Browser**, which will open Burp's pre-configured browser, and automatically route **all web traffic through Burp**.


![proxy browser](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_browser.png)
>this button is doing the same thing

## Proxy Setup

If we want to use a real browser to do a pentest. We can manually mannualy go to :

**Firefox > Settings > Network Settings > ** and setup the proxy listening port. (*Burp default port 8080*)

![preferences](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_config.png)

>Notes : You can use any port you want. If it is already used, the proxy will fail to start.

>Note: In case we wanted to serve the web proxy on a different port, we can do that in Burp under (Proxy>Proxy settings>Proxy listeners),

We can verify if proxy working by making a request to a website and look if burp has intercepted the request.

![intercept](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_intercept.png)

The firefox extension [FoxyProxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) permit to easyly switch beetween proxy.
