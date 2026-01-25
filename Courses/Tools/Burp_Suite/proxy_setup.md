# Burp Suite - Proxy Setup

## Pre-Configured Browser

In Burp's **(Proxy>Intercept)**, we can click on **Open Browser**, which will open Burp's pre-configured browser, and automatically route **all web traffic through Burp**.


![proxy browser](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_browser.png)
>this button is doing the same thing

## Proxy Setup

If we want to use a real browser to do a pentest. We can manually mannualy go to :

**Firefox > Settings > Network Settings >** and setup the proxy listening port. (*Burp default port 8080*)

![preferences](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_config.png)

>Notes : You can use any port you want. If it is already used, the proxy will fail to start.

>Note: In case we wanted to serve the web proxy on a different port, we can do that in Burp under (Proxy>Proxy settings>Proxy listeners),

We can verify if proxy working by making a request to a website and look if burp has intercepted the request.

![intercept](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_intercept.png)

The firefox extension [FoxyProxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/) permit to easyly switch beetween proxy.

## Installing CA Certificate

Another important step when using Burp Proxy with our browser is installing the web proxy's CA Certificates. If we don't do this step, some HTTPS traffic may not get properly routed, or we may need to click accept every time Firefox needs to send an HTTPS request.

Go to [burp](http://burp) download link and click on **CA certificate**

![burp ca](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_certificate.png)

Once we have our certificates, we can install them within Firefox by browsing to **Firefox > Settings**, search for 'Certifiates', and clicking **View Certificates**.

![burp view ca](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_view_ca.png)

After that, we can select the Authorities tab, and then click on import, and select the downloaded CA certificate

![burp cert import](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_cert.png)

Finally, we must select Trust this CA to identify websites and Trust this CA to identify email users, and then click OK.

![burp cert trust](https://github.com/ftTower/ftTower/blob/main/assets/Cybersec-Portfolio/Courses/Tools/burp_suite/proxy_trust.png)

Once we install the certificate and configure the Firefox proxy, all Firefox web traffic will start routing through our web proxy.
