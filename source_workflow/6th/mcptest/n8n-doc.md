<page>
  <title>Git and n8n | n8n Docs </title>
  <url>https://docs.n8n.io/source-control-environments/understand/git/</url>
  <content>
[Skip to content](https://docs.n8n.io/source-control-environments/understand/git/#git-and-n8n)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/source-control-environments/understand/git.md "Edit this page")

# Git and n8n [\#](https://docs.n8n.io/source-control-environments/understand/git/\#git-and-n8n "Permanent link")

n8n uses Git to provide source control. To use this feature, it helps to have some knowledge of basic Git concepts. n8n doesn't implement all Git functionality: you shouldn't view n8n's source control as full version control.

New to Git and source control?

If you're new to Git, don't panic. You don't need to learn Git to use n8n. This document explains the concepts you need. You do need some Git knowledge to set up the source control, as this involves work in your Git provider.

Familiar with Git and source control?

If you're familiar with Git, don't rely on behaviors matching exactly. In particular, be aware that source control in n8n doesn't support a pull request-style review and merge process, unless you do this outside n8n in your Git provider.

This page introduces the Git concepts and terminology used in n8n. It doesn't cover everything you need to set up and manage a repository. The person doing the [Setup](https://docs.n8n.io/source-control-environments/setup/) should have some familiarity with Git and with their Git hosting provider.

This is a brief introduction

Git is a complex topic. This section provides a brief introduction to the key terms you need when using environments in n8n. If you want to learn about Git in depth, refer to [GitHub \| Git and GitHub learning resources](https://docs.github.com/en/get-started/quickstart/git-and-github-learning-resources).

## Git overview [\#](https://docs.n8n.io/source-control-environments/understand/git/\#git-overview "Permanent link")

[Git](https://git-scm.com/) is a tool for managing, tracking, and collaborating on multiple versions of documents. It's the basis for widely used platforms such as [GitHub](https://github.com/) and [GitLab](https://about.gitlab.com/).

## Branches: Multiple copies of a project [\#](https://docs.n8n.io/source-control-environments/understand/git/\#branches-multiple-copies-of-a-project "Permanent link")

Git uses branches to maintain multiple copies of a document alongside each other. Every branch has its own version. A common pattern is to have a main branch, and then everyone who wants to contribute to the project works on their own branch (copy). When they finish their work, their branch is merged back into the main branch.

[![Diagram](https://docs.n8n.io/_images/source-control-environments/simple-git-branch.png)](https://docs.n8n.io/_images/source-control-environments/simple-git-branch.png)

## Local and remote: Moving work between your machine and a Git provider [\#](https://docs.n8n.io/source-control-environments/understand/git/\#local-and-remote-moving-work-between-your-machine-and-a-git-provider "Permanent link")

A common pattern when using Git is to install Git on your own computer, and use a Git provider such as GitHub to work with Git in the cloud. In effect, you have a Git repository (project) on GitHub, and work with copies of it on your local machine.

n8n uses this pattern for source control: you'll work with your workflows on your n8n instance, but send them to your Git provider to store them.

## Push, pull, and commit [\#](https://docs.n8n.io/source-control-environments/understand/git/\#push-pull-and-commit "Permanent link")

n8n uses three key Git processes:

- **Push**: send work from your instance to Git. This saves a copy of your workflows and tags, as well as credential and variable stubs, to Git. You can choose which workflows you want to save.
- **Pull**: get the workflows, tags, and variables from Git and load it into n8n. You will need to populate any credentials or variable stubs included in the refreshed items.



Pulling overwrites your work



If you have made changes to a workflow in n8n, you must push the changes to Git before pulling. When you pull, it overwrites any changes you've made if they aren't stored in Git.

- **Commit**: a commit in n8n is a single occurrence of pushing work to Git. In n8n, commit and push happen at the same time.


Refer to [Push and pull](https://docs.n8n.io/source-control-environments/using/push-pull/) for detailed information about how n8n interacts with Git.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Miro credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/miro/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/miro/#miro-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/miro.md "Edit this page")

# Miro credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/miro/\#miro-credentials "Permanent link")

You can use these credentials to authenticate when using the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](https://docs.n8n.io/integrations/custom-operations/).

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/miro/\#prerequisites "Permanent link")

Create a [Miro](https://miro.com/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/miro/\#supported-authentication-methods "Permanent link")

- OAuth2

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/miro/\#related-resources "Permanent link")

Refer to [Miro's API documentation](https://developers.miro.com/reference/overview) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/miro/) on n8n's website.

## Using OAuth2 [\#](https://docs.n8n.io/integrations/builtin/credentials/miro/\#using-oauth2 "Permanent link")

To configure this credential, you'll need a [Miro](https://miro.com/login/) account and app, as well as:

- A **Client ID**: Generated when you create a new OAuth2 application.
- A **Client Secret**: Generated when you create a new OAuth2 application.

Refer to [Miro's API documentation](https://developers.miro.com/reference/overview) for more information about authenticating to the service.

Note for n8n Cloud users

Cloud users don't need to provide connection details. Select **Connect my account** to connect through your browser.

If you're [self-hosting](https://docs.n8n.io/hosting/) n8n, you'll need to [create an app](https://developers.miro.com/docs/rest-api-build-your-first-hello-world-app) to configure OAuth2. Refer to [Miro's OAuth documentation](https://developers.miro.com/docs/getting-started-with-oauth) for more information about setting up OAuth2.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Incident response | n8n Docs </title>
  <url>https://docs.n8n.io/privacy-security/incident-response/</url>
  <content>
[Skip to content](https://docs.n8n.io/privacy-security/incident-response/#incident-response)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/privacy-security/incident-response.md "Edit this page")

# Incident response [\#](https://docs.n8n.io/privacy-security/incident-response/\#incident-response "Permanent link")

n8n implements incident response best practices for identifying, documenting, resolving and communicating incidents.

n8n publishes incident notifications to a status page at [n8n Status](https://status.n8n.cloud/).

n8n notifies customers of any data breaches according to the company's [Data Processing Addendum](https://n8n.io/legal/#data).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

×

This website uses cookies

We use cookies to personalise content, ads and to analyse our traffic. We also share information about your use of our site with our advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services. [Read more](https://n8n.io/legal/?eco_features=CAMPAIGN_PERSONALIZATION#privacy)

Strictly necessary

Performance

Targeting

Functionality

Save & Close

Accept all

Decline all

Show details
Hide details

Cookie declaration

About cookies

Strictly necessary

Performance

Targeting

Functionality

Strictly necessary cookies allow core website functionality such as user login and account management. The website cannot be used properly without strictly necessary cookies.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| \_\_sec\_\_token | n8n.io | 1 day |  |
| \_\_sec\_\_fid | n8n.io | 9 months 4 weeks |  |
| \_\_sec\_\_ghost | n8n.io | 9 months 4 weeks |  |
| \_\_sec\_tid | n8n.io | 9 months 4 weeks |  |
| rl\_session | .n8n.io | 1 year | This cookie is used for managing user session on the website. It typically maintains the user's state during the session, ensuring that users remain connected and their interactions with the site are coherent throughout their visit. This can include keeping users logged in, tracking their actions, or persisting settings during the session. |
| AWSALBTGCORS | [Amazon Web Services, Inc.](https://aws.amazon.com/privacy/)<br> airtable.com | 1 week | This cookie is used to support load balancing, ensuring that visitor page requests are routed to the same server in any browsing session. |
| \_tracking\_consent | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 1 year | Tracking preferences. |
| \_orig\_referrer | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 2 weeks | This cookie is generally provided by Shopify and is used in connection with a shopping cart. |
| \_\_Host-airtable-session.sig | [Airtable](https://airtable.com/privacy)<br> airtable.com | 1 year | This cookie is used to ensure secure user sessions and for authentication purposes. |
| \_GRECAPTCHA | [Google LLC](https://policies.google.com/privacy)<br> www.google.com | 5 months 3 weeks | Google reCAPTCHA sets a necessary cookie (\_GRECAPTCHA) when executed for the purpose of providing its risk analysis. |
| brwConsent | [Airtable](https://airtable.com/privacy)<br> .airtable.com | 4 minutes 59 seconds | This cookie is used to record the user's consent to the use of cookies on the website, ensuring compliance with the website's privacy policy by remembering the user's preferences and consent state regarding cookies. |
| localization | [Flickr Inc.](https://www.flickr.com/help/privacy)<br> merch.n8n.io | 1 year | These cookies are set on pages with the Flickr widget. |
| \_\_Host-airtable-session | [Airtable](https://airtable.com/privacy)<br> airtable.com | 1 year | This cookie is used to manage the user session in a secure way, ensuring the user's interaction with the website is seamless and secure while accessing Airtable integrations or content. |
| \_\_sec\_crid | n8n.io | 9 months 4 weeks |  |
| keep\_alive | merch.n8n.io | Session | This cookie is used to maintain an active user session on the website and ensure that the user's connection remains secure and uninterrupted during their browsing session. |
| \_\_sec\_\_cid | n8n.io | 1 day |  |
| \_\_cf\_logged\_in | [Cloudflare](https://www.cloudflare.com/privacypolicy/)<br> .cloudflare.com | 4 weeks 2 days | Part of our security firewall Cloudflare (e.g. identifying trusted users) |
| CF\_VERIFIED\_DEVICE\_XXXXX | [Cloudflare](https://www.cloudflare.com/privacypolicy/)<br> .cloudflare.com | 1 year | Cloudflare |
| sparrow\_id | [Cloudflare](https://www.cloudflare.com/privacypolicy/)<br> .cloudflare.com | 5 months 3 weeks | This cookie is used by Cloudflare to help optimise the performance and security of the website and access to it. They do not contain user credentials, IP anonymisation is used. |

Cookie report

Performance cookies are used to see how visitors use the website, eg. analytics cookies. Those cookies cannot be used to directly identify a certain visitor.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| ph\_phc\_XXXXX\_posthog | [Posthog](https://posthog.com/privacy)<br> .tapfiliate.com | 1 year | Posthog |
| \_gat\_UA-146470481-8 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 59 seconds | This is a pattern type cookie set by Google Analytics, where the pattern element on the name contains the unique identity number of the account or website it relates to. It is a variation of the \_gat cookie which is used to limit the amount of data recorded by Google on high traffic volume websites. |
| \_gid | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 day | This cookie is set by Google Analytics. It stores and update a unique value for each page visited and is used to count and track pageviews. |
| rl\_anonymous\_id | .n8n.io | 1 year | This cookie is used to identify anonymously a visitor. It is generally used for tracking and analytics purposes, helping website owners understand how visitors interact with the site. |
| \_ga | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. |
| \_ga\_PGLF3YY0XT | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| rl\_page\_init\_referrer | .n8n.io | 1 year |  |
| \_ga\_Q7GL51X95F | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| \_gat\_UA-146470481-5 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 59 seconds | This is a pattern type cookie set by Google Analytics, where the pattern element on the name contains the unique identity number of the account or website it relates to. It is a variation of the \_gat cookie which is used to limit the amount of data recorded by Google on high traffic volume websites. |
| \_shopify\_y | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 1 year 6 hours | This cookie is associated with Shopify's analytics suite. <br>Provider address: <br>151 O'Connor Street, Ground floor, Ottawa, ON, K2P 2L8, Canada |
| \_ga\_1EB8LCPG5B | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| rl\_group\_id | .n8n.io | 1 year | This cookie is used to group users for analytical purposes to enhance user experience on the website. |
| \_ga\_0SC4FF2FH9 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| originalClientId | .n8n.io | 4 weeks 2 days |  |
| \_shopify\_s | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 30 minutes | This cookie is associated with Shopify's analytics suite. |
| n8n\_tracking\_id | .n8n.io | 1 year 1 month |  |
| \_landing\_page | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 2 weeks | This cookie is used to track, report, and analyze on landing pages. |
| rl\_page\_init\_referring\_domain | .n8n.io | 1 year |  |
| AMCV\_XXXXX | [Adobe](https://www.adobe.com/privacy/policy.html)<br> .cloudflare.com | 4 weeks 2 days | Adobe Experience Cloud cookie that enables tracking visitors across multiple domains. |
| AMCVS\_XXXXX | [Adobe](https://www.adobe.com/privacy/policy.html)<br> .cloudflare.com | Session | Adobe Experience Cloud cookie that serves as a flag indicating that the session has been initialized. Its value is always 1 and discontinues when the session has ended. |
| cfz\_google-analytics\_v4 | [Google LLC](https://policies.google.com/privacy)<br> .cloudflare.com | 1 year | Cloudflare Zaraz Google Analytics cookie |
| cfzs\_google-analytics\_v4 | [Google LLC](https://policies.google.com/privacy)<br> .cloudflare.com | Session | Cloudflare Zaraz Google Analytics session cookie |

Cookie report

Targeting cookies are used to identify visitors between different websites, eg. content partners, banner networks. Those cookies may be used by companies to build a profile of visitor interests or show relevant ads on other websites.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| lang | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | Session | linkedin.com targeting |
| li\_sugr | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 2 months 4 weeks | linkedin.com targeting |
| UserMatchHistory | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 4 weeks 2 days | linkedin.com targeting |
| AnalyticsSyncHistory | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 4 weeks 2 days | linkedin.com targeting |
| datr | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | This cookie identifies the browser connecting to Facebook. It is not directly tied to individual Facebook the user. Facebook reports that it is used to help with security and suspicious login activity, especially around detection of bots trying to access the service. Facebook also say the behavioural profile associated with each datr cookie is deleted after 10 days. This cookie is also read via Like and other Facebook buttons and tags placed on many different websites. |
| sb | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | Facebook browser identification, authentication, marketing, and other Facebook-specific function cookies. |
| wd | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 week | This cookie carries out information about how the end user uses the website and any advertising that the end user may have seen before visiting the said website. |
| rdt\_uuid | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .n8n.io | 2 months 4 weeks | Identify users who've seen n8n ads on Reddit so that we can run our ads more efficiently. |
| csv | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year 1 month | This cookie is typically used for tracking user behavior and interaction with the website to improve user experience. |
| edgebucket | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year 1 month | Used by Reddit to deliver advertising |
| loid | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year 1 month | This cookie is used to identify a unique visitor's session and preferences. |
| pc | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year |  |
| reddit\_session | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | Session |  |
| session\_tracker | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | Session | This cookie is used to track user sessions for improving user experience and ensuring secure browsing sessions. It helps in maintaining an active session for the user without needing to log in multiple times during their visit. |
| t2\_XXXXX\_recentclicks3 | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year |  |
| theme | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year | This cookie is used to store the user's theme preference on the website, allowing for a consistent and personalized visual experience across different pages. |
| token\_v2 | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 day |  |
| IDE | [Google LLC](https://policies.google.com/privacy)<br> .doubleclick.net | 1 year 1 month | Google Ads targeting |
| bcookie | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 1 year | This is a Microsoft MSN 1st party cookie for sharing the content of the website via social media. |
| \_rdt\_uuid | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .n8n.io | 2 months 4 weeks | This cookie is used to identify a browser over time to show relevant advertisements to users by collecting data on their preferences and behavior across multiple sites. |
| YSC | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | Session | This cookie is set by YouTube to track views of embedded videos. |
| guest\_id\_ads | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie is associated with Twitter's advertising services. It is used to identify and track the website visitor to display personalized ads based on the user's preferences and interaction with the website. <br>Provider address: <br>1355 Market St #900, San Francisco, CA 94103 |
| \_\_cf\_bm | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 29 minutes 54 seconds | This is a Cloudflare cookie that is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website. |
| rl\_trait | .n8n.io | 1 year | This cookie is used to collect information about user behavior and preferences to optimize the user experience and for targeted advertising. |
| \_gat\_gtag\_UA\_146470481\_1 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 minute | This cookie is part of Google Analytics and is used to limit requests (throttle request rate). |
| \_fbp | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .n8n.io | 2 months 4 weeks | Used by Meta to deliver a series of advertisement products such as real time bidding from third party advertisers |
| personalization\_id | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie carries out information about how the end user uses the website and any advertising that the end user may have seen before visiting the said website. |
| rl\_group\_trait | .n8n.io | 1 year | This cookie is used for segmenting audiences based on predefined criteria, aiming to provide more personalized and relevant content to the website users. |
| \_\_cf\_bm | [Twitter Inc.](https://twitter.com/privacy)<br> .t.co | 29 minutes 54 seconds | This is a Cloudflare cookie that is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website. |
| VISITOR\_INFO1\_LIVE | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | 5 months 4 weeks | This cookie is set by Youtube to keep track of user preferences for Youtube videos embedded in sites;it can also determine whether the website visitor is using the new or old version of the Youtube interface. |
| \_gcl\_au | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 2 months 4 weeks | Used by Google AdSense for experimenting with advertisement efficiency across websites using their services |
| guest\_id | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie is set by Twitter to identify and track the website visitor. |
| muc\_ads | [Twitter](https://twitter.com/privacy)<br> .t.co | 1 year 1 month | This cookie is used for targeting and advertising purposes. It helps track and personalize advertising content to enhance user experience. |
| docapp-coupon | [Amazon Web Services, Inc.](https://aws.amazon.com/privacy/)<br> merch.n8n.io | 1 day | This cookie is used to track promotions or offers through which a user accesses the site. It stores coupon codes or special identifiers to apply discounts or special offers upon checkout or sign-up. |
| lidc | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 1 day | This is a Microsoft MSN 1st party cookie that ensures the proper functioning of this website. |
| guest\_id\_marketing | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie is used to identify a visitor across visits and devices. It allows the website to present the visitor with relevant advertisement based on the visitor's preferences. |
| ps\_l | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | This cookie is associated with user preferences and saving settings to enhance the user experience on the website. |
| ps\_n | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | This cookie is used to remember the user's preferences and previous interactions with the website. |
| fr | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 2 months 4 weeks | Contains browser and user unique ID combination, used for targeted advertising. |
| csrf\_token | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | Session | This cookie is used by Cloudflare to identify trusted web traffic. |
| cfz\_facebook-pixel | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .cloudflare.com | 1 year | Cloudflare Zaraz facebook pixel cookie |

Cookie report

Functionality cookies are used to remember visitor information on the website, eg. language, timezone, enhanced content.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| intercom-device-id-XXXXX | [Intercom](https://www.intercom.com/legal/privacy)<br> .hockeystack.com | 5 months 3 weeks |  |
| intercom-id-XXXXX | [Intercom](https://www.intercom.com/legal/privacy)<br> .hockeystack.com | 5 months 3 weeks |  |
| intercom-session-XXXXX | [Intercom](https://www.intercom.com/legal/privacy)<br> .hockeystack.com | 1 week |  |
| brw | [Airtable](https://airtable.com/privacy)<br> .airtable.com | 1 year | This cookie is used to track user behavior and interaction to improve user experience and service functionality. |
| VISITOR\_PRIVACY\_METADATA | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | 5 months 4 weeks | This cookie is used to store the user's consent and privacy choices for their interaction with the site. It records data on the visitor's consent regarding various privacy policies and settings, ensuring that their preferences are honored in future sessions. |
| rl\_user\_id | .n8n.io | 1 year | This cookie is used to recognize and distinguish individual users who visit the website, enabling personalized experiences and interactions. |
| \_\_Secure-ROLLOUT\_TOKEN | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | 5 months 4 weeks |  |
| paddle\_session | [Paddle](https://www.paddle.com/legal/privacy)<br> .paddle.com | 1 day |  |

Cookie report

Cookies are small text files that are placed on your computer by websites that you visit. Websites use cookies to help users navigate efficiently and perform certain functions. Cookies that are required for the website to operate properly are allowed to be set without your permission. All other cookies need to be approved before they can be set in the browser.

You can change your consent to cookie usage at any time on our Privacy Policy page.

We also use cookies to collect data for the purpose of personalizing and measuring the effectiveness of our advertising. For more details, visit the [Google Privacy Policy](https://business.safety.google/privacy/).

Cookies consent ID :


Cookie [report](https://cookie-script.com/cookie-report?identifier=1b4e80ddbf628b4879ee5c282b121a43) created by [CookieScript](https://cookie-script.com/ "CookieScript Consent Management Platform")

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>MySQL credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/mysql/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/mysql/#mysql-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/mysql.md "Edit this page")

# MySQL credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/mysql/\#mysql-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [MySQL](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.mysql/)
- [Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/)

Agent node users

The Agent node doesn't support SSH tunnels.

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/mysql/\#prerequisites "Permanent link")

Create a user account on a [MySQL](https://www.mysql.com/) server database.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/mysql/\#supported-authentication-methods "Permanent link")

- Database connection

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/mysql/\#related-resources "Permanent link")

Refer to [MySQL's documentation](https://dev.mysql.com/doc/refman/8.3/en/) for more information about the service.

## Using database connection [\#](https://docs.n8n.io/integrations/builtin/credentials/mysql/\#using-database-connection "Permanent link")

To configure this credential, you'll need:

- The server **Host**: The database's host name or IP address.
- The **Database** name.
- A **User** name.
- A **Password** for that user.
- The **Port** number used by the MySQL server.
- **Connect Timeout**: The number of milliseconds during the initial database connection before a timeout occurs.
- **SSL**: If your database is using SSL, turn this on and add details for the SSL certificate.
- **SSH Tunnel**: Choose whether to connect over an SSH tunnel. An SSH tunnel lets un-encrypted traffic pass over an encrypted connection and enables authorized remote access to servers protected from outside connections by a firewall.

To set up your database connection credential:

1. Enter your database's hostname as the **Host** in your n8n credential. Run this query to confirm the hostname:



|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>SHOW VARIABLES WHERE Variable_name = 'hostname';<br>``` |

2. Enter your database's name as the **Database** in your n8n credential. Run this query to confirm the database name:



|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>SHOW DATABASES;<br>``` |

3. Enter the username of a **User** in the database. This user should have appropriate permissions for whatever actions you want n8n to perform.

4. Enter the **Password** for that user.
5. Enter the **Port** number used by the MySQL server (default is `3306`). Run this query to confirm the port number:



|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>SHOW VARIABLES WHERE Variable_name = 'port';<br>``` |

6. Enter the **Connect Timeout** you'd like the node to use. The Connect Timeout is the number of milliseconds during the initial database connection the node should wait before timing out. n8n defaults to `10000` which is the default used by MySQL of 10 seconds. If you want to match your database's `connect_timeout`, run this query to get it, then multiply by 1000 before entering it in n8n:



|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>SHOW VARIABLES WHERE Variable_name = 'connect_timeout';<br>``` |

7. If your database uses SSL and you'd like to use **SSL** for the connection, turn this option on in the credential. If you turn it on, enter the information from your MySQL SSL certificate in these fields:
1. Enter the `ca.pem` file contents in the **CA Certificate** field.
2. Enter the `client-key.pem` file contents in the **Client Private Key** field.
3. Enter the `client-cert.pem` file contents in the **Client Certificate** field.
8. If you want to use **SSH Tunnel** for the connection, turn this option on in the credential. Otherwise, skip it. If you turn it on:
1. Select the **SSH Authenticate with** to set the SSH Tunnel type to build:
      - Select **Password** if you want to connect to SSH using a password.
      - Select **Private Key** if you want to connect to SSH using an identity file (private key) and a passphrase.
2. Enter the **SSH Host**. n8n uses this host to create the SSH URI formatted as: `[user@]host:port`.
3. Enter the **SSH Port**. n8n uses this port to create the SSH URI formatted as: `[user@]host:port`.
4. Enter the **SSH User** to connect with. n8n uses this user to create the SSH URI formatted as: `[user@]host:port`.
5. If you selected **Password** for **SSH Authenticate with**, add the **SSH Password**.
6. If you selected **Private Key** for **SSH Authenticate with**:
      1. Add the contents of the **Private Key** or identity file used for SSH. This is the same as using the `ssh-identity-file` option with the `shell-connect()` command in MySQL.
      2. If the **Private Key** was created with a passphrase, enter that **Passphrase**. This is the same as using the `ssh-identity-pass` option with the `shell-connect()` command in MySQL. If the **Private Key** has no passphrase, leave this field blank.

Refer to [MySQL \| Creating SSL and RSA Certificates and Keys](https://dev.mysql.com/doc/refman/8.0/en/creating-ssl-rsa-files.html) for more information on working with SSL certificates in MySQL. Refer to [MySQL \| Using an SSH Tunnel](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-connection-ssh.html) for more information on working with SSH tunnels in MySQL.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Markdown | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/#markdown)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.markdown.md "Edit this page")

# Markdown [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#markdown "Permanent link")

The Markdown node converts between Markdown and HTML formats.

## Operations [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#operations "Permanent link")

This node's operations are **Modes**:

- **Markdown to HTML**: Use this mode to convert from Markdown to HTML.
- **HTML to Markdown**: Use this mode to convert from HTML to Markdown.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#node-parameters "Permanent link")

- **HTML** or **Markdown**: Enter the data you want to convert. The field name changes based on which **Mode** you select.
- **Destination Key**: Enter the field you want to put the output in. Specify nested fields using dots, for example `level1.level2.newKey`.

## Node options [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#node-options "Permanent link")

The node's **Options** depend on the **Mode** selected.

Test out the options

Some of the options depend on each other or can interact. We recommend testing out options to confirm the effects are what you want.

### Markdown to HTML options [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#markdown-to-html-options "Permanent link")

| Option | Description | Default |
| --- | --- | --- |
| **Add Blank To Links** | Whether to open links a new window (enabled) or not (disabled). | Disabled |
| **Automatic Linking To URLs** | Whether to automatically link to URLs (enabled) or not (disabled). If enabled, n8n converts any string that it identifies as a URL to a link. | Disabled |
| **Backslash Escapes HTML Tags** | Whether to allow backslash escaping of HTML tags (enabled) or not (disabled). When enabled, n8n escapes any `<` or `>` prefaced with `\`. For example, `\<div\>` renders as `&lt;div&gt;`. | Disabled |
| **Complete HTML Document** | Whether to output a complete HTML document (enabled) or an HTML fragment (disabled). A complete HTML document includes the `<DOCTYPE HTML>` declaration, `<html>` and `<body>` tags, and the `<head>` element. | Disabled |
| **Customized Header ID** | Whether to support custom heading IDs (enabled) or not (disabled). When enabled, you can add custom heading IDs using `{header ID here}` after the heading text. | Disabled |
| **Emoji Support** | Whether to support emojis (enabled) or not (disabled). | Disabled. |
| **Encode Emails** | Whether to transform ASCII character emails into their equivalent decimal entities (enabled) or not (disabled). | Enabled |
| **Exclude Trailing Punctuation From URLs** | Whether to exclude trailing punctuation from automatically linked URLs (enabled) or not (disabled). For use with **Automatic Linking To URLs**. | Disabled |
| **GitHub Code Blocks** | Whether to enable GitHub Flavored Markdown code blocks (enabled) or not (disabled). | Enabled |
| **GitHub Compatible Header IDs** | Whether to generate GitHub Flavored Markdown heading IDs (enabled) or not (disabled). GitHub Flavored Markdown generates heading IDs with `-` in place of spaces and removes non-alphanumeric characters. | Disabled |
| **GitHub Mention Link** | Change the link used with **GitHub Mentions**. | Disabled |
| **GitHub Mentions** | Whether to support tagging GitHub users with `@` (enabled) or not (disabled). When enabled, n8n replaces `@name` with `https://github.com/name`. | Disabled |
| **GitHub Task Lists** | Whether to support GitHub Flavored Markdown task lists (enabled) or not (disabled). | Disabled |
| **Header Level Start** | Number. Set the start level for headers. For example, changing this field to `2` causes n8n to treat `#` as `<h2>`, `##` as `<h3>`, and so on. | 1 |
| **Mandatory Space Before Header** | Whether to make a space between `#` and heading text required (enabled) or not (disabled). When enabled, n8n renders a heading written as `##Some header text` literally (it doesn't turn it into a heading element) | Disabled |
| **Middle Word Asterisks** | Whether n8n should treat asterisks in words as Markdown (disabled) or render them as literal asterisks (enabled). | Disabled |
| **Middle Word Underscores** | Whether n8n should treat underscores in words as Markdown (disabled) or render them as literal underscores (enabled). | Disabled |
| **No Header ID** | Disable automatic generation of header IDs (enabled). | Disabled |
| **Parse Image Dimensions** | Support setting maximum image dimensions in Markdown syntax (enabled). | Disabled |
| **Prefix Header ID** | Define a prefix to add to header IDs. | None |
| **Raw Header ID** | Whether to remove spaces, `'`, and `"` from header IDs, including prefixes, replacing them with `-` (enabled) or not (disabled). | Disabled |
| **Raw Prefix Header ID** | Whether to prevent n8n from modifying header prefixes (enabled) or not (disabled) | Disabled |
| **Simple Line Breaks** | Whether to create line breaks without a double space at the end of a line (enabled) or not (disabled). | Disabled |
| **Smart Indentation Fix** | Whether to try to smartly fix indentation problems related to ES6 template strings in indented code blocks (enabled) or not (disabled). | Disabled |
| **Spaces Indented Sublists** | Whether to remove the requirement to indent sublists four spaces (enabled) or not (disabled). | Disabled |
| **Split Adjacent Blockquotes** | Whether to split adjacent blockquote blocks (enabled) or not (disabled). If you don't enable this, n8n treats quotes (indicated by `>` at the start of the line) on separate lines as a single blockquote, even when separated by an empty line. | Disabled |
| **Strikethrough** | Whether to support strikethrough syntax (enabled) or not (disabled). When enabled, you can add a ~~strikethrough~~ effect using `~~` around the word or phrase. | Disabled |
| **Tables Header ID** | Whether to add an ID to table header tags (enabled) or not (disabled). | Disabled |
| **Tables Support** | Whether to support tables (enabled) or not (disabled). | Disabled |

### HTML to Markdown options [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#html-to-markdown-options "Permanent link")

| Option | Description | Default |
| --- | --- | --- |
| **Bullet Marker** | Specify the character to use for unordered lists. | \* |
| **Code Block Fence** | Specify the characters to use for code blocks. | \`\`\` |
| **Emphasis Delimiter** | Specify the character `<em>`. | \_ |
| **Global Escape Pattern** | Overrides the default character escape settings. You may want to use Text Replacement Pattern instead. | None |
| **Ignored Elements** | Ignore given HTML elements, and their children. | None |
| **Keep Images With Data** | Whether to keep images with data (enabled) or not (disabled). Support files up to 1MB. | Disabled |
| **Line Start Escape Pattern** | Overrides the default character escape settings. You may want to use Text Replacement Pattern instead. | None |
| **Max Consecutive New Lines** | Number. Specify the maximum number of consecutive new lines allowed. | 3 |
| **Place URLs At The Bottom** | Whether to place URLs at the bottom of the page and format using link reference definitions (enabled) or not (disabled). | Disabled |
| **Strong Delimiter** | Specify the characters for `<strong>`. | \*\* |
| **Style For Code Block** | Specify the styling for code blocks. Options are **Fence** and **Indented**. | Fence |
| **Text Replacement Pattern** | Define a text replacement pattern using regex. | None |
| **Treat As Blocks** | Specify HTML elements to treat as blocks (surround with blank lines) | None |

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#templates-and-examples "Permanent link")

**AI agent that can scrape webpages**

by Eduard

[View template details](https://n8n.io/workflows/2006-ai-agent-that-can-scrape-webpages/)

**Autonomous AI crawler**

by Oskar

[View template details](https://n8n.io/workflows/2315-autonomous-ai-crawler/)

**Personalized AI Tech Newsletter Using RSS, OpenAI and Gmail**

by Miha

[View template details](https://n8n.io/workflows/3986-personalized-ai-tech-newsletter-using-rss-openai-and-gmail/)

[Browse Markdown integration templates](https://n8n.io/integrations/markdown/), or [search all templates](https://n8n.io/workflows/)

## Parsers [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.markdown/\#parsers "Permanent link")

n8n uses the following parsers:

- To convert from HTML to Markdown: [node-html-markdown](https://www.npmjs.com/package/node-html-markdown).
- To convert from Markdown to HTML: [Showdown](https://www.npmjs.com/package/showdown). Some options allow you to extend your Markdown with [GitHub Flavored Markdown](https://github.github.com/gfm/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Ollama Chat Model node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/#ollama-chat-model-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/index.md "Edit this page")

# Ollama Chat Model node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#ollama-chat-model-node "Permanent link")

The Ollama Chat Model node allows you use local Llama 2 models with conversational [agents](https://docs.n8n.io/glossary/#ai-agent).

On this page, you'll find the node parameters for the Ollama Chat Model node, and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/ollama/).

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#node-parameters "Permanent link")

- **Model**: Select the model that generates the completion. Choose from:
  - **Llama2**
  - **Llama2 13B**
  - **Llama2 70B**
  - **Llama2 Uncensored**

Refer to the Ollama [Models Library documentation](https://ollama.com/library) for more information about available models.

## Node options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#node-options "Permanent link")

- **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
- **Top K**: Enter the number of token choices the model uses to generate the next token.
- **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#templates-and-examples "Permanent link")

**Chat with local LLMs using n8n and Ollama**

by Mihai Farcas

[View template details](https://n8n.io/workflows/2384-chat-with-local-llms-using-n8n-and-ollama/)

**🔐🦙🤖 Private & Local Ollama Self-Hosted AI Assistant**

by Joseph LePage

[View template details](https://n8n.io/workflows/2729-private-and-local-ollama-self-hosted-ai-assistant/)

**Auto Categorise Outlook Emails with AI**

by Wayne Simpson

[View template details](https://n8n.io/workflows/2454-auto-categorise-outlook-emails-with-ai/)

[Browse Ollama Chat Model integration templates](https://n8n.io/integrations/ollama-chat-model/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#related-resources "Permanent link")

Refer to [LangChains's Ollama Chat Model documentation](https://js.langchain.com/docs/integrations/chat/ollama/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

## Common issues [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#common-issues "Permanent link")

For common questions or issues and suggested solutions, refer to [Common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/common-issues/).

## Self-hosted AI Starter Kit [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatollama/\#self-hosted-ai-starter-kit "Permanent link")

New to working with AI and using self-hosted n8n? Try n8n's [self-hosted AI Starter Kit](https://docs.n8n.io/hosting/starter-kits/ai-starter-kit/) to get started with a proof-of-concept or demo playground using Ollama, Qdrant, and PostgreSQL.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Rocket.Chat credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/rocketchat/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/rocketchat/#rocketchat-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/rocketchat.md "Edit this page")

# Rocket.Chat credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/rocketchat/\#rocketchat-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Rocket.Chat](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.rocketchat/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/rocketchat/\#prerequisites "Permanent link")

- Create a [Rocket.Chat](https://rocket.chat/) account.
- Your account must have the `create-personal-access-tokens` permission to generate personal access tokens.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/rocketchat/\#supported-authentication-methods "Permanent link")

- API access token

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/rocketchat/\#related-resources "Permanent link")

Refer to [Rocket.Chat's API documentation](https://developer.rocket.chat/reference/api/rest-api) for more information about the service.

## Using API access token [\#](https://docs.n8n.io/integrations/builtin/credentials/rocketchat/\#using-api-access-token "Permanent link")

To configure this credential, you'll need:

- Your **User ID**: Displayed when you generate an access token.
- An **Auth Key**: Your personal access token. To generate an access token, go to your **avatar > Account > Personal Access Tokens**. Copy the token and add it as the n8n **Auth Key**.
- Your Rocket.Chat **Domain**: Also known as your default URL or workspace URL.

Refer to [Personal Access Tokens](https://docs.rocket.chat/docs/manage-your-account-settings#personal-access-tokens) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Dirty nodes | n8n Docs </title>
  <url>https://docs.n8n.io/workflows/executions/dirty-nodes/</url>
  <content>
[Skip to content](https://docs.n8n.io/workflows/executions/dirty-nodes/#dirty-nodes)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/workflows/executions/dirty-nodes.md "Edit this page")

# Dirty nodes [\#](https://docs.n8n.io/workflows/executions/dirty-nodes/\#dirty-nodes "Permanent link")

A **dirty node** is a node that executed successfully in the past, but whose output n8n now considers stale or unreliable. They're labeled like this to indicate that if the node executes again, the output may be different. It may also be the point where a [partial execution](https://docs.n8n.io/workflows/executions/manual-partial-and-production-executions/#partial-executions) starts from.

## How to recognize dirty node data [\#](https://docs.n8n.io/workflows/executions/dirty-nodes/\#how-to-recognize-dirty-node-data "Permanent link")

In the canvas of the workflow editor, you can identify dirty notes by their different-colored border and a yellow triangle in place of the previous green tick symbol. For example:

[!["Image of node displayed with yellow border"](https://docs.n8n.io/_images/workflows/executions/dirty-node-canvas.png)](https://docs.n8n.io/_images/workflows/executions/dirty-node-canvas.png)

In the node editor view, the output panel also displays a yellow triangle on the output panel. If you hover over the triangle, a tooltip appears with more information about why n8n considers the data stale:

[!["Image of node displayed with yellow border"](https://docs.n8n.io/_images/workflows/executions/dirty-node-editor.png)](https://docs.n8n.io/_images/workflows/executions/dirty-node-editor.png)

## Why n8n marks nodes dirty [\#](https://docs.n8n.io/workflows/executions/dirty-nodes/\#why-n8n-marks-nodes-dirty "Permanent link")

There are several reasons why n8n might flag execution data as stale. For example:

- Inserting or deleting a node: labels the first node that follows the inserted node dirty.
- Modifying node parameters: labels the modified node dirty.
- Adding a connector: labels the destination node of the new connector dirty.
- Deactivating a node: labels the first node that follows the deactivated node dirty.

Other reasons n8n marks nodes dirty

- Unpinning a node: labels the unpinned node dirty.
- Modifying pinned data: labels the node that comes after the pinned data dirty.
- If any of the above actions occur inside a loop, also labels the first node of the loop dirty.

For sub-nodes, also labels any executed parent nodes (up to and including the root) when:

- Editing an executed sub-node
- Adding a new sub-node
- Disconnecting or deleting a sub-node
- Deactivating a sub-node
- Activating a sub-node

- When deleting a connected node in a workflow:

[!["Image of node displayed with yellow border"](https://docs.n8n.io/_images/workflows/executions/dirty-before.png)](https://docs.n8n.io/_images/workflows/executions/dirty-before.png)

- The next node in the sequence becomes dirty:

[!["Image of node displayed with yellow border"](https://docs.n8n.io/_images/workflows/executions/dirty-after.png)](https://docs.n8n.io/_images/workflows/executions/dirty-after.png)


When using loops (with the [Loop over Items](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) node), when any node within the loop is dirty, the initial node of the loop is also considered dirty:

[!["Image of node displayed with yellow border"](https://docs.n8n.io/_images/workflows/executions/dirty-loop.png)](https://docs.n8n.io/_images/workflows/executions/dirty-loop.png)

## Resolving dirty nodes [\#](https://docs.n8n.io/workflows/executions/dirty-nodes/\#resolving-dirty-nodes "Permanent link")

Executing a node again clears its dirty status. You can do this manually by triggering the whole workflow, or by running a [partial execution](https://docs.n8n.io/workflows/executions/manual-partial-and-production-executions/#partial-executions) with **Execute step** on the individual node or any node which follows it.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>GitHub Document Loader node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/#github-document-loader-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader.md "Edit this page")

# GitHub Document Loader node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/\#github-document-loader-node "Permanent link")

Use the GitHub Document Loader node to load data from a GitHub repository for [vector stores](https://docs.n8n.io/glossary/#ai-vector-store) or summarization.

On this page, you'll find the node parameters for the GitHub Document Loader node, and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/github/). This node doesn't support OAuth for authentication.

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/\#node-parameters "Permanent link")

- **Text Splitting**: Choose from:
  - **Simple**: Uses the [Recursive Character Text Splitter](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.textsplitterrecursivecharactertextsplitter/) with a chunk size of 1000 and an overlap of 200.
  - **Custom**: Allows you to connect a text splitter of your choice.
- **Repository Link**: Enter the URL of your GitHub repository.
- **Branch**: Enter the branch name to use.

## Node options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/\#node-options "Permanent link")

- **Recursive**: Select whether to include sub-folders and files (turned on) or not (turned off).
- **Ignore Paths**: Enter directories to ignore.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/\#templates-and-examples "Permanent link")

[Browse GitHub Document Loader integration templates](https://n8n.io/integrations/github-document-loader/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentgithubloader/\#related-resources "Permanent link")

Refer to [LangChain's documentation on document loaders](https://js.langchain.com/docs/modules/data_connection/document_loaders/integrations/file_loaders/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Keap credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/keap/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/keap/#keap-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/keap.md "Edit this page")

# Keap credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/keap/\#keap-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Keap](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.keap/)
- [Keap Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.keaptrigger/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/keap/\#prerequisites "Permanent link")

Create a [Keap](https://developer.keap.com/) developer account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/keap/\#supported-authentication-methods "Permanent link")

- OAuth2

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/keap/\#related-resources "Permanent link")

Refer to Keap's [REST API documentation](https://developer.keap.com/docs/restv2/) for more information about the service.

## Using OAuth2 [\#](https://docs.n8n.io/integrations/builtin/credentials/keap/\#using-oauth2 "Permanent link")

Note for n8n Cloud users

Cloud users don't need to provide connection details. Select **Connect my account** to connect through your browser.

If you need to configure OAuth2 from scratch or need more detail on what's happening in the OAuth web flow, refer to the instructions in the [Getting Started with OAuth2 documentation](https://developer.keap.com/getting-started-oauth-keys/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Facebook Trigger Permissions object documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/#facebook-trigger-permissions-object)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions.md "Edit this page")

# Facebook Trigger Permissions object [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/\#facebook-trigger-permissions-object "Permanent link")

Use this object to receive updates when a user grants or revokes a permission for your app. Refer to [Facebook Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/) for more information on the trigger itself.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/facebookapp/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.

## Trigger configuration [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/\#trigger-configuration "Permanent link")

To configure the trigger with this Object:

1. Select the **Credential to connect with**. Select an existing or create a new [Facebook App credential](https://docs.n8n.io/integrations/builtin/credentials/facebookapp/).
2. Enter the **APP ID** of the app connected to your credential. Refer to the [Facebook App credential](https://docs.n8n.io/integrations/builtin/credentials/facebookapp/) documentation for more information.
3. Select **Permissions** as the **Object**.
4. **Field Names or IDs**: By default, the node will trigger on all the available events using the `*` wildcard filter. If you'd like to limit the events, use the `X` to remove the star and use the dropdown or an expression to select the updates you're interested in.
5. In **Options**, choose whether to turn on the toggle to **Include Values**. When turned on, the node includes the new values for the changes.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/\#related-resources "Permanent link")

Refer to Meta's [Permissions](https://developers.facebook.com/docs/graph-api/webhooks/reference/permissions/) Graph API reference for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>DeepSeek Chat Model node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/#deepseek-chat-model-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek.md "Edit this page")

# DeepSeek Chat Model node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#deepseek-chat-model-node "Permanent link")

Use the DeepSeek Chat Model node to use DeepSeek's chat models with conversational [agents](https://docs.n8n.io/glossary/#ai-agent).

On this page, you'll find the node parameters for the DeepSeek Chat Model node and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/deepseek/).

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#node-parameters "Permanent link")

### Model [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#model "Permanent link")

Select the model to use to generate the completion.

n8n dynamically loads models from DeepSeek and you'll only see the models available to your account.

## Node options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#node-options "Permanent link")

Use these options to further refine the node's behavior.

### Base URL [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#base-url "Permanent link")

Enter a URL here to override the default URL for the API.

### Frequency Penalty [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#frequency-penalty "Permanent link")

Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.

### Maximum Number of Tokens [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#maximum-number-of-tokens "Permanent link")

Enter the maximum number of tokens used, which sets the completion length.

### Response Format [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#response-format "Permanent link")

Choose **Text** or **JSON**. **JSON** ensures the model returns valid JSON.

### Presence Penalty [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#presence-penalty "Permanent link")

Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.

### Sampling Temperature [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#sampling-temperature "Permanent link")

Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.

### Timeout [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#timeout "Permanent link")

Enter the maximum request time in milliseconds.

### Max Retries [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#max-retries "Permanent link")

Enter the maximum number of times to retry a request.

### Top P [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#top-p "Permanent link")

Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#templates-and-examples "Permanent link")

**🐋🤖 DeepSeek AI Agent + Telegram + LONG TERM Memory 🧠**

by Joseph LePage

[View template details](https://n8n.io/workflows/2864-deepseek-ai-agent-telegram-long-term-memory/)

**🤖 AI content generation for Auto Service 🚘 Automate your social media📲!**

by N8ner

[View template details](https://n8n.io/workflows/4600-ai-content-generation-for-auto-service-automate-your-social-media/)

**Automate Blog Content Creation with Notion MCP, DeepSeek AI, and WordPress**

by Dr. Firas

[View template details](https://n8n.io/workflows/3348-automate-blog-content-creation-with-notion-mcp-deepseek-ai-and-wordpress/)

[Browse DeepSeek Chat Model integration templates](https://n8n.io/integrations/deepseek-chat-model/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmchatdeepseek/\#related-resources "Permanent link")

As DeepSeek is API-compatible with OpenAI, you can refer to [LangChains's OpenAI documentation](https://js.langchain.com/docs/integrations/chat/openai/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Bubble credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/bubble/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/bubble/#bubble-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/bubble.md "Edit this page")

# Bubble credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/bubble/\#bubble-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Bubble](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bubble/)

API access

You need a paid plan to access the Bubble APIs.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/bubble/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/bubble/\#related-resources "Permanent link")

Refer to [Bubble's API documentation](https://manual.bubble.io/help-guides/integrations/api) for more information about the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/bubble/\#using-api-key "Permanent link")

To configure this credential, you'll need a paid [Bubble](https://bubble.io/) account and:

- An **API Token**
- An **App Name**
- Your **Domain**, if you're using a custom domain

To set it up, you'll need to create an app:

01. Go to the [**Apps**](https://bubble.io/home/apps) page in Bubble.
02. Select **Create an app**.
03. Enter a **Name** for your app, like `n8n-integration`.
04. Select **Get started**. The app's details open.
05. In the left navigation, select **Settings** (the gear cog icon).
06. Select the **API** tab.
07. In the **Public API Endpoints** section, check the box to **Enable Data API**.
08. The page displays the **Data API root URL**, for example: `https://n8n-integration.bubbleapps.io/version-test/api/1.1/obj`.
09. Copy the part of the URL after `https://` and before `.bubbleapps.io` and enter it in n8n as the **App Name**. In the above example, you'd enter `n8n-integration`.
10. Select **Generate a new API token**.
11. Enter an **API Token Label**, like `n8n integration`.
12. Copy the **Private key** and enter it as the **API Token** in your n8n credential.
    - Refer to [Data API \| Authentication](https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/authentication) for more information on generating API tokens.
13. In n8n, select the **Environment** that best matches your app:
    - Select **Development** for an app that you haven't deployed, accessed at `https://appname.bubbleapps.io/version-test` or `https://www.mydomain.com/version-test`.
    - Select **Live** for an app that you've [deployed](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/deploying-your-app), accessed at `https://appname.bubbleapps.io` or `https://www.mydomain.com`.
14. In n8n, select your **Hosting**:
    - If you haven't set up a custom domain, select **Bubble Hosting**.
    - If you've set up a [custom domain](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/web-app/custom-domain-and-dns), select **Self Hosted** and enter your custom **Domain**.

Refer to Bubble's [Creating and managing apps](https://manual.bubble.io/help-guides/getting-started/creating-and-managing-apps) documentation for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Simple Vector Store node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/#simple-vector-store-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory.md "Edit this page")

# Simple Vector Store node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#simple-vector-store-node "Permanent link")

Use the Simple Vector Store node to store and retrieve [embeddings](https://docs.n8n.io/glossary/#ai-embedding) in n8n's in-app memory.

On this page, you'll find the node parameters for the Simple Vector Store node, and links to more resources.

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

This node is different from AI memory nodes

The simple vector storage described here is different to the AI memory nodes such as [Simple Memory](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/).

This node creates a [vector database](https://docs.n8n.io/glossary/#ai-vector-store) in the app memory.

## Data safety limitations [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#data-safety-limitations "Permanent link")

Before using the Simple Vector Store node, it's important to understand its limitations and how it works.

Warning

n8n recommends using Simple Vector store for development use only.

### Vector store data isn't persistent [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#vector-store-data-isnt-persistent "Permanent link")

This node stores data in memory only. All data is lost when n8n restarts and may also be purged in low-memory conditions.

### All instance users can access vector store data [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#all-instance-users-can-access-vector-store-data "Permanent link")

Memory keys for the Simple Vector Store node are global, not scoped to individual workflows.

This means that all users of the instance can access vector store data by adding a Simple Vector Store node and selecting the memory key, regardless of the access controls set for the original workflow. Take care not to expose sensitive information when ingesting data with the Simple Vector Store node.

## Node usage patterns [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#node-usage-patterns "Permanent link")

You can use the Simple Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#use-as-a-regular-node-to-insert-and-retrieve-documents "Permanent link")

You can use the Simple Vector Store as a regular node to insert or get documents. This pattern places the Simple Vector Store in the regular connection flow without using an agent.

You can see an example of in step 2 of [this template](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/).

### Connect directly to an AI agent as a tool [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#connect-directly-to-an-ai-agent-as-a-tool "Permanent link")

You can connect the Simple Vector Store node directly to the [tool](https://docs.n8n.io/glossary/#ai-tool) connector of an [AI agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Simple Vector Store node.

### Use a retriever to fetch documents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#use-a-retriever-to-fetch-documents "Permanent link")

You can use the [Vector Store Retriever](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/) node with the Simple Vector Store node to fetch documents from the Simple Vector Store node. This is often used with the [Question and Answer Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

An [example of the connection flow](https://n8n.io/workflows/1960-ask-questions-about-a-pdf-using-ai/) (the linked example uses Pinecone, but the pattern is the same) would be: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Simple Vector Store.

### Use the Vector Store Question Answer Tool to answer questions [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#use-the-vector-store-question-answer-tool-to-answer-questions "Permanent link")

Another pattern uses the [Vector Store Question Answer Tool](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/) to summarize results and answer questions from the Simple Vector Store node. Rather than connecting the Simple Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The [connections flow](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/) in this case would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Simple Vector store.

## Memory Management [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#memory-management "Permanent link")

The Simple Vector Store implements memory management to prevent excessive memory usage:

- Automatically cleans up old vector stores when memory pressure increases
- Removes inactive stores that haven't been accessed for a configurable amount of time

### Configuration Options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#configuration-options "Permanent link")

You can control memory usage with these environment variables:

| Variable | Type | Default | Description |
| --- | --- | --- | --- |
| `N8N_VECTOR_STORE_MAX_MEMORY` | Number | -1 | Maximum memory in MB allowed for all vector stores combined (-1 to disable limits). |
| `N8N_VECTOR_STORE_TTL_HOURS` | Number | -1 | Hours of inactivity after which a store gets removed (-1 to disable TTL). |

On n8n Cloud, these values are preset to 100MB (about 8,000 documents, depending on document size and metadata) and 7 days respectively. For self-hosted instances, both values default to -1(no memory limits or time-based cleanup).

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#node-parameters "Permanent link")

### Operation Mode [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#operation-mode "Permanent link")

This Vector Store node has four modes: **Get Many**, **Insert Documents**, **Retrieve Documents (As Vector Store for Chain/Tool)**, and **Retrieve Documents (As Tool for AI Agent)**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

#### Get Many [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#get-many "Permanent link")

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt is embedded and used for similarity search. The node returns the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context.

#### Insert Documents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#insert-documents "Permanent link")

Use insert documents mode to insert new documents into your vector database.

#### Retrieve Documents (as Vector Store for Chain/Tool) [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#retrieve-documents-as-vector-store-for-chaintool "Permanent link")

Use Retrieve Documents (As Vector Store for Chain/Tool) mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

#### Retrieve Documents (as Tool for AI Agent) [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#retrieve-documents-as-tool-for-ai-agent "Permanent link")

Use Retrieve Documents (As Tool for AI Agent) mode to use the vector store as a tool resource when answering queries. When formulating responses, the agent uses the vector store when the vector store name and description match the question details.

### Rerank Results [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#rerank-results "Permanent link")

Enables [reranking](https://docs.n8n.io/glossary/#ai-reranking). If you enable this option, you must connect a reranking node to the vector store. That node will then rerank the results for queries. You can use this option with the `Get Many`, `Retrieve Documents (As Vector Store for Chain/Tool)` and `Retrieve Documents (As Tool for AI Agent)` modes.

### Get Many parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#get-many-parameters "Permanent link")

- **Memory Key**: Select or create the key containing the vector memory you want to query.
- **Prompt**: Enter the search query.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#insert-documents-parameters "Permanent link")

- **Memory Key**: Select or create the key you want to store the vector memory as.
- **Clear Store**: Use this parameter to control whether to wipe the vector store for the given memory key for this workflow before inserting data (turned on).

### Retrieve Documents (As Vector Store for Chain/Tool) parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#retrieve-documents-as-vector-store-for-chaintool-parameters "Permanent link")

- **Memory Key**: Select or create the key containing the vector memory you want to query.

### Retrieve Documents (As Tool for AI Agent) parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#retrieve-documents-as-tool-for-ai-agent-parameters "Permanent link")

- **Name**: The name of the vector store.
- **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
- **Memory Key**: Select or create the key containing the vector memory you want to query.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#templates-and-examples "Permanent link")

**Building Your First WhatsApp Chatbot**

by Jimleuk

[View template details](https://n8n.io/workflows/2465-building-your-first-whatsapp-chatbot/)

**RAG Chatbot for Company Documents using Google Drive and Gemini**

by Mihai Farcas

[View template details](https://n8n.io/workflows/2753-rag-chatbot-for-company-documents-using-google-drive-and-gemini/)

**🤖 AI Powered RAG Chatbot for Your Docs + Google Drive + Gemini + Qdrant**

by Joseph LePage

[View template details](https://n8n.io/workflows/2982-ai-powered-rag-chatbot-for-your-docs-google-drive-gemini-qdrant/)

[Browse Simple Vector Store integration templates](https://n8n.io/integrations/in-memory-vector-store/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoreinmemory/\#related-resources "Permanent link")

Refer to [LangChains's Memory Vector Store documentation](https://js.langchain.com/docs/integrations/vectorstores/memory/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Ollama Model node common issues | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/#ollama-model-node-common-issues)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues.md "Edit this page")

# Ollama Model node common issues [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#ollama-model-node-common-issues "Permanent link")

Here are some common errors and issues with the [Ollama Model node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/) and steps to resolve or troubleshoot them.

## Processing parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#processing-parameters "Permanent link")

The Ollama Model node is a [sub-node](https://docs.n8n.io/glossary/#sub-node-n8n). Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including [root nodes](https://docs.n8n.io/glossary/#root-node-n8n), take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.

## Can't connect to a remote Ollama instance [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#cant-connect-to-a-remote-ollama-instance "Permanent link")

The Ollama Model node supports Bearer token authentication for connecting to remote Ollama instances behind authenticated proxies (such as Open WebUI).

For remote authenticated connections, configure both the remote URL and API key in your Ollama credentials.

Follow the [Ollama credentials instructions](https://docs.n8n.io/integrations/builtin/credentials/ollama/) for more information.

## Can't connect to a local Ollama instance when using Docker [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#cant-connect-to-a-local-ollama-instance-when-using-docker "Permanent link")

The Ollama Model node connects to a locally hosted Ollama instance using the base URL defined by [Ollama credentials](https://docs.n8n.io/integrations/builtin/credentials/ollama/). When you run either n8n or Ollama in Docker, you need to configure the network so that n8n can connect to Ollama.

Ollama typically listens for connections on `localhost`, the local network address. In Docker, by default, each container has its own `localhost` which is only accessible from within the container. If either n8n or Ollama are running in containers, they won't be able to connect over `localhost`.

The solution depends on how you're hosting the two components.

### If only Ollama is in Docker [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#if-only-ollama-is-in-docker "Permanent link")

If only Ollama is running in Docker, configure Ollama to listen on all interfaces by binding to `0.0.0.0` inside of the container (the official images are already configured this way).

When running the container, [publish the ports](https://docs.docker.com/get-started/docker-concepts/running-containers/publishing-ports/) with the `-p` flag. By default, Ollama runs on port 11434, so your Docker command should look like this:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama<br>``` |

When configuring [Ollama credentials](https://docs.n8n.io/integrations/builtin/credentials/ollama/), the `localhost` address should work without a problem (set the **base URL** to `http://localhost:11434`).

### If only n8n is in Docker [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#if-only-n8n-is-in-docker "Permanent link")

If only n8n is running in Docker, configure Ollama to listen on all interfaces by binding to `0.0.0.0` on the host.

If you are running n8n in Docker on **Linux**, use the `--add-host` flag to map `host.docker.internal` to `host-gateway` when you start the container. For example:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>docker run -it --rm --add-host host.docker.internal:host-gateway --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n<br>``` |

If you are using Docker Desktop, this is automatically configured for you.

When configuring [Ollama credentials](https://docs.n8n.io/integrations/builtin/credentials/ollama/), use `host.docker.internal` as the host address instead of `localhost`. For example, to bind to the default port 11434, you could set the base URL to `http://host.docker.internal:11434`.

### If Ollama and n8n are running in separate Docker containers [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#if-ollama-and-n8n-are-running-in-separate-docker-containers "Permanent link")

If both n8n and Ollama are running in Docker in separate containers, you can use Docker networking to connect them.

Configure Ollama to listen on all interfaces by binding to `0.0.0.0` inside of the container (the official images are already configured this way).

When configuring [Ollama credentials](https://docs.n8n.io/integrations/builtin/credentials/ollama/), use the Ollama container's name as the host address instead of `localhost`. For example, if you call the Ollama container `my-ollama` and it listens on the default port 11434, you would set the base URL to `http://my-ollama:11434`.

### If Ollama and n8n are running in the same Docker container [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#if-ollama-and-n8n-are-running-in-the-same-docker-container "Permanent link")

If Ollama and n8n are running in the same Docker container, the `localhost` address doesn't need any special configuration. You can configure Ollama to listen on localhost and configure the base URL in the [Ollama credentials in n8n](https://docs.n8n.io/integrations/builtin/credentials/ollama/) to use localhost: `http://localhost:11434`.

## Error: connect ECONNREFUSED ::1:11434 [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#error-connect-econnrefused-111434 "Permanent link")

This error occurs when your computer has IPv6 enabled, but Ollama is listening to an IPv4 address.

To fix this, change the base URL in your [Ollama credentials](https://docs.n8n.io/integrations/builtin/credentials/ollama/) to connect to `127.0.0.1`, the IPv4-specific local address, instead of the `localhost` alias that can resolve to either IPv4 or IPv6: `http://127.0.0.1:11434`.

## Ollama and HTTP/HTTPS proxies [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmollama/common-issues/\#ollama-and-httphttps-proxies "Permanent link")

Ollama doesn't support custom HTTP agents in its configuration. This makes it difficult to use Ollama behind custom HTTP/HTTPS proxies. Depending on your proxy configuration, it might not work at all, despite setting the `HTTP_PROXY` or `HTTPS_PROXY` environment variables.

Refer to [Ollama's FAQ](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-do-i-use-ollama-behind-a-proxy) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Webex by Cisco Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.ciscowebextrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.ciscowebextrigger/#webex-by-cisco-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.ciscowebextrigger.md "Edit this page")

# Webex by Cisco Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.ciscowebextrigger/\#webex-by-cisco-trigger-node "Permanent link")

[Webex by Cisco](https://webex.com/) is a web conferencing and videoconferencing application.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/ciscowebex/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Webex by Cisco Trigger integrations](https://n8n.io/integrations/webex-by-cisco-trigger/) page.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Codex files | n8n Docs  </title>
  <url>https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/#node-codex-files)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/creating-nodes/build/reference/node-codex-files.md "Edit this page")

# Node codex files [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/\#node-codex-files "Permanent link")

The codex file contains metadata about your node. This file is the JSON file at the root of your node. For example, the [`HttpBin.node.json`](https://github.com/n8n-io/n8n-nodes-starter/blob/master/nodes/HttpBin/HttpBin.node.json) file in the n8n starter.

The codex filename must match the node base filename. For example, given a node base file named `MyNode.node.ts`, the codex would be named `MyNode.node.json`.

| Parameter | Description |
| --- | --- |
| `node` | Includes the node name. Must start with `n8n-nodes-base.`. For example, `n8n-nodes-base.openweatherapi`. |
| `nodeVersion` | The node version. This should have the same value as the `version` parameter in your main node file. For example, `"1.0"`. |
| `codexVersion` | The codex file version. The current version is `"1.0"`. |
| `categories` | The settings in the `categories` array determine which category n8n adds your node to in the GUI. See [Node categories](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/#node-categories) for more information. |
| `resources` | The `resources` object contains links to your node documentation. n8n automatically adds help links to credentials and nodes in the GUI. |

## Node categories [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/\#node-categories "Permanent link")

You can define one or more categories in your node configuration JSON. This helps n8n put the node in the correct category in the nodes panel.

Choose from these categories:

- Data & Storage
- Finance & Accounting
- Marketing & Content
- Productivity
- Miscellaneous
- Sales
- Development
- Analytics
- Communication
- Utility

You must match the syntax. For example, `Data & Storage` not `data and storage`.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Let AI specify tool parameters | n8n Docs </title>
  <url>https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/</url>
  <content>
[Skip to content](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/#let-ai-specify-the-tool-parameters)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/advanced-ai/examples/using-the-fromai-function.md "Edit this page")

# Let AI specify the tool parameters [\#](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/\#let-ai-specify-the-tool-parameters "Permanent link")

When configuring [tools](https://docs.n8n.io/glossary/#ai-tool) connected to the Tools Agent, many parameters can be filled in by the AI model itself. The AI model will use the context from the task and information from other connected tools to fill in the appropriate details.

There are two ways to do this, and you can switch between them.

## Let the model fill in the parameter [\#](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/\#let-the-model-fill-in-the-parameter "Permanent link")

Each appropriate parameter field in the tool's editing dialog has an extra button at the end:

[![image showing stars icon to the right of parameter field](https://docs.n8n.io/_images/advanced-ai/ai-stars.png)](https://docs.n8n.io/_images/advanced-ai/ai-stars.png)

On activating this button, the [AI Agent](https://docs.n8n.io/glossary/#ai-agent) will fill in the expression for you, with no need for any further user input.
The field itself is filled in with a message indicating that the parameter has been defined automatically by the model.

If you want to define the parameter yourself, click on the 'X' in this box to revert to user-defined values. Note that the 'expression' field will now contain the expression generated by this feature, though you can now edit it further to add extra details as described in the following section.

Warning

Activating this feature will overwrite any manual definition you may have already added.

## Use the `$fromAI()` function [\#](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/\#use-the-fromai-function "Permanent link")

The `$fromAI()` function uses AI to dynamically fill in parameters for tools connected to the [Tools AI agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/).

Only for tools

The `$fromAI()` function is only available for tools connected to the AI Agent node. The `$fromAI()` function doesn't work with the [Code](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolcode/) tool or with [other non-tool cluster sub-nodes](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/).

To use the `$fromAI()` function, call it with the required `key` parameter:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>{{ $fromAI('email') }}<br>``` |

The `key` parameter and other arguments to the `$fromAI()` function aren't references to existing values. Instead, think of these arguments as hints that the AI model will use to populate the right data.

For instance, if you choose a key called `email`, the AI Model will look for an email address in its context, other tools, and input data. In chat workflows, it may ask the user for an email address if it can't find one elsewhere. You can optionally pass other parameters like `description` to give extra context to the AI model.

### Parameters [\#](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/\#parameters "Permanent link")

The `$fromAI()` function accepts the following parameters:

| Parameter | Type | Required? | Description |
| --- | --- | --- | --- |
| `key` | string | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | A string representing the key or name of the argument. This must be between 1 and 64 characters in length and can only contain lowercase letters, uppercase letters, numbers, underscores, and hyphens. |
| `description` | string | ![❌](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/274c.svg) | A string describing the argument. |
| `type` | string | ![❌](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/274c.svg) | A string specifying the data type. Can be string, number, boolean, or json (defaults to string). |
| `defaultValue` | any | ![❌](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/274c.svg) | The default value to use for the argument. |

### Examples [\#](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/\#examples "Permanent link")

As an example, you could use the following `$fromAI()` expression to dynamically populate a field with a name:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>$fromAI("name", "The commenter's name", "string", "Jane Doe")<br>``` |

If you don't need the optional parameters, you could simplify this as:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>$fromAI("name")<br>``` |

To dynamically populate the number of items you have in stock, you could use a `$fromAI()` expression like this:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>$fromAI("numItemsInStock", "Number of items in stock", "number", 5)<br>``` |

If you only want to fill in parts of a field with a dynamic value from the model, you can use it in a normal expression as well. For example, if you want the model to fill out the `subject` parameter for an e-mail, but always pre-fix the generated value with the string 'Generated by AI:', you could use the following expression:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>Generated by AI: {{ $fromAI("subject") }}<br>``` |

### Templates [\#](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/\#templates "Permanent link")

You can see the `$fromAI()` function in action in the following [templates](https://docs.n8n.io/glossary/#template-n8n):

- [Angie, Personal AI Assistant with Telegram Voice and Text](https://n8n.io/workflows/2462-angie-personal-ai-assistant-with-telegram-voice-and-text/)
- [Automate Customer Support Issue Resolution using AI Text Classifier](https://n8n.io/workflows/2468-automate-customer-support-issue-resolution-using-ai-text-classifier/)
- [Scale Deal Flow with a Pitch Deck AI Vision, Chatbot and QDrant Vector Store](https://n8n.io/workflows/2464-scale-deal-flow-with-a-pitch-deck-ai-vision-chatbot-and-qdrant-vector-store/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>OpenAI Text operations | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/#openai-text-operations)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations.md "Edit this page")

# OpenAI Text operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/\#openai-text-operations "Permanent link")

Use this operation to message a model or classify text for violations in OpenAI. Refer to [OpenAI](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/) for more information on the OpenAI node itself.

## Message a Model [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/\#message-a-model "Permanent link")

Use this operation to send a message or prompt to an OpenAI model and receive a response.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](https://docs.n8n.io/integrations/builtin/credentials/openai/).
- **Resource**: Select **Text**.
- **Operation**: Select **Message a Model**.
- **Model**: Select the model you want to use. If you’re not sure which model to use, try `gpt-4o` if you need high intelligence or `gpt-4o-mini` if you need the fastest speed and lowest cost. Refer to [Models overview \| OpenAI Platform](https://platform.openai.com/docs/models) for more information.
- **Messages**: Enter a **Text** prompt and assign a **Role** that the model will use to generate responses. Refer to [Prompt engineering \| OpenAI](https://platform.openai.com/docs/guides/prompt-engineering) for more information on how to write a better prompt by using these roles. Choose from one of these roles:
  - **User**: Sends a message as a user and gets a response from the model.
  - **Assistant**: Tells the model to adopt a specific tone or personality.
  - **System**: By default, the system message is `"You are a helpful assistant"`. You can define instructions in the user message, but the instructions set in the system message are more effective. You can only set one system message per conversation. Use this to set the model's behavior or context for the next user message.
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data.
- **Output Content as JSON**: Turn on to attempt to return the response in JSON format. Compatible with `GPT-4 Turbo` and all `GPT-3.5 Turbo` models newer than `gpt-3.5-turbo-1106`.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/\#options "Permanent link")

- **Frequency Penalty**: Apply a penalty to reduce the model's tendency to repeat similar lines. The range is between `0.0` and `2.0`.
- **Maximum Number of Tokens**: Set the maximum number of tokens for the response. One token is roughly four characters for standard English text. Use this to limit the length of the output.
- **Number of Completions**: Defaults to 1. Set the number of completions you want to generate for each prompt. Use carefully since setting a high number will quickly consume your tokens.
- **Presence Penalty**: Apply a penalty to influence the model to discuss new topics. The range is between `0.0` and `2.0`.
- **Output Randomness (Temperature)**: Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around `0.7`) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it. Defaults to `1.0`.
- **Output Randomness (Top P)**: Adjust the Top P setting to control the diversity of the assistant's responses. For example, `0.5` means half of all likelihood-weighted options are considered. We recommend altering this or **Output Randomness (Temperature)** but not both. Defaults to `1.0`.

Refer to [Message a Model \| OpenAI](https://platform.openai.com/docs/api-reference/text-completion/create) documentation for more information.

## Classify Text for Violations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/\#classify-text-for-violations "Permanent link")

Use this operation to identify and flag content that might be harmful. OpenAI model will analyze the text and return a response containing:

- `flagged`: A boolean field indicating if the content is potentially harmful.
- `categories`: A list of category-specific violation flags.
- `category_scores`: Scores for each category.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](https://docs.n8n.io/integrations/builtin/credentials/openai/).
- **Resource**: Select **Text**.
- **Operation**: Select **Classify Text for Violations**.
- **Text Input**: Enter text to classify if it violates the moderation policy.
- **Simplify Output**: Turn on to return a simplified version of the response instead of the raw data.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/\#options_1 "Permanent link")

- **Use Stable Model**: Turn on to use the stable version of the model instead of the latest version, accuracy may be slightly lower.

Refer to [Moderations \| OpenAI](https://platform.openai.com/docs/api-reference/moderations) documentation for more information.

## Common issues [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/text-operations/\#common-issues "Permanent link")

For common errors or issues and suggested resolution steps, refer to [Common Issues](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Limit | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/#limit)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.limit.md "Edit this page")

# Limit [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/\#limit "Permanent link")

Use the Limit node to remove items beyond a defined maximum number. You can choose whether n8n takes the items from the beginning or end of the input data.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/\#node-parameters "Permanent link")

Configure this node using the following parameters.

### Max Items [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/\#max-items "Permanent link")

Enter the maximum number of items that n8n should keep. If the input data contains more than this value, n8n removes the items.

### Keep [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/\#keep "Permanent link")

If the node has to remove items, select where it keeps the input items from:

- **First Items**: Keeps the **Max Items** number of items from the beginning of the input data.
- **Last Items**: Keeps the **Max Items** number of items from the end of the input data.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/\#templates-and-examples "Permanent link")

**Scrape and summarize webpages with AI**

by n8n Team

[View template details](https://n8n.io/workflows/1951-scrape-and-summarize-webpages-with-ai/)

**Generate Leads with Google Maps**

by Alex Kim

[View template details](https://n8n.io/workflows/2605-generate-leads-with-google-maps/)

**Chat with OpenAI Assistant (by adding a memory)**

by David Roberts

[View template details](https://n8n.io/workflows/2098-chat-with-openai-assistant-by-adding-a-memory/)

[Browse Limit integration templates](https://n8n.io/integrations/limit/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.limit/\#related-resources "Permanent link")

Learn more about [data structure and data flow](https://docs.n8n.io/data/) in n8n workflows.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Twilio Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/#twilio-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger.md "Edit this page")

# Twilio Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/\#twilio-trigger-node "Permanent link")

Use the Twilio Trigger node to respond to events in [Twilio](https://www.twilio.com/) and integrate Twilio with other applications. n8n has built-in support for a wide range of Twilio events, including new SMS and calls.

On this page, you'll find a list of events the Twilio Trigger node can respond to and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/twilio/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Twilio integrations](https://n8n.io/integrations/twilio-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/\#events "Permanent link")

- On New SMS
- On New Call

New Call Delay

It can take Twilio up to thirty minutes to generate a summary for a completed call.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.twiliotrigger/\#related-resources "Permanent link")

n8n provides an app node for Twilio. You can find the node docs [here](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.twilio/).

View [example workflows and related content](https://n8n.io/integrations/twilio/) on n8n's website.

Refer to [Twilio's documentation](https://www.twilio.com/docs) for details about their API.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Grist credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/grist/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/grist/#grist-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/grist.md "Edit this page")

# Grist credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/grist/\#grist-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Grist](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.grist/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/grist/\#prerequisites "Permanent link")

Create a [Grist](https://getgrist.com/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/grist/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/grist/\#related-resources "Permanent link")

Refer to [Grist's API documentation](https://support.getgrist.com/api/) for more information about the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/grist/\#using-api-key "Permanent link")

To configure this credential, you'll need:

- An **API Key**: Refer to the [Grist API authentication documentation](https://support.getgrist.com/rest-api/#authentication) for instructions on creating an API key.
- To select your Grist **Plan Type**. Options include:
  - Free
  - Paid: If selected, provide your Grist **Custom Subdomain**. This is the portion that comes before `.getgrist.com`. For example, if our full Grist domain was `n8n.getgrist.com`, we'd enter `n8n` here.
  - Self-Hosted: If selected, provide your Grist **Self-Hosted URL**. This should be the full URL.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Mist credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/mist/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/mist/#mist-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/mist.md "Edit this page")

# Mist credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/mist/\#mist-credentials "Permanent link")

You can use these credentials to authenticate when using the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](https://docs.n8n.io/integrations/custom-operations/).

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/mist/\#prerequisites "Permanent link")

Create a [Mist](https://www.mist.com/) account and organization. Refer to [Create a Mist account and Organization](https://www.mist.com/documentation/create-mist-org/) for detailed instructions.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/mist/\#supported-authentication-methods "Permanent link")

- API token

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/mist/\#related-resources "Permanent link")

Refer to [Mist's documentation](https://www.mist.com/documentation/mist-api-introduction/) for more information about the service. If you're logged in to your Mist account, go to [https://api.mist.com/api/v1/docs/Home](https://api.mist.com/api/v1/docs/Home) to view the full API documentation.

This is a credential-only node. Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/mist/) on n8n's website.

## Using API token [\#](https://docs.n8n.io/integrations/builtin/credentials/mist/\#using-api-token "Permanent link")

To configure this credential, you'll need:

- An **API Token**: You can use either a User API token or an Org API token. Refer to [How to generate a user API token](https://www.mist.com/documentation/using-postman/) for instructions on generating a User API token. Refer to [Org API token](https://www.mist.com/documentation/org-api-token/) for instructions on generating an Org API token.
- Select the **Region** you're in. Options include:
  - **Europe**: Select this option if your cloud environment is in any of the EMEA regions.
  - **Global**: Select this option if your cloud environment is in any of the global regions.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Iterable node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.iterable/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.iterable/#iterable-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.iterable.md "Edit this page")

# Iterable node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.iterable/\#iterable-node "Permanent link")

Use the Iterable node to automate work in Iterable, and integrate Iterable with other applications. n8n has built-in support for a wide range of Iterable features, including creating users, recording the actions performed by the users, and adding and removing users from the list.

On this page, you'll find a list of operations the Iterable node supports and links to more resources.

Credentials

Refer to [Iterable credentials](https://docs.n8n.io/integrations/builtin/credentials/iterable/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.iterable/\#operations "Permanent link")

- Event
  - Record the actions a user perform
- User
  - Create/Update a user
  - Delete a user
  - Get a user
- User List
  - Add user to list
  - Remove a user from a list

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.iterable/\#templates-and-examples "Permanent link")

[Browse Iterable integration templates](https://n8n.io/integrations/iterable/), or [search all templates](https://n8n.io/workflows/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Edit Image | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#edit-image)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.editimage.md "Edit this page")

# Edit Image [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#edit-image "Permanent link")

Use the Edit Image node to manipulate and edit images.

Dependencies

1. If you aren't running n8n on Docker, you need to install [GraphicsMagick](http://www.graphicsmagick.org/README.html).
2. You need to use a node such as the [Read/Write Files from Disk](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.readwritefile/) node or the [HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) node to pass the image file as a data property to the Edit Image node.

## Operations [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#operations "Permanent link")

- Add a **Blur** to the image to reduce sharpness
- Add a **Border** to the image
- **Composite** an image on top of another image
- **Create** a new image
- **Crop** the image
- **Draw** on an image
- **Get Information** about the image
- **Multi Step** perform multiple operations on the image
- **Resize**: Change the size of the image
- **Rotate** the image
- **Shear** image along the X or Y axis
- Add **Text** to the image
- Make a color in image **Transparent**

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#node-parameters "Permanent link")

The parameters for this node depend on the operation you select.

### Blur parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#blur-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Blur**: Enter a number to set how strong the blur should be, between 0 and 1000. Higher numbers create blurrier images.
- **Sigma**: Enter a number to set the stigma for the blur, between 0 and 1000. Higher numbers create blurrier images.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Border parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#border-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Border Width**: Enter the width of the border.
- **Border Height**: Enter the height of the border.
- **Border Color**: Set the color for the border. You can either enter a hex or select the color swatch to open a color picker.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Composite parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#composite-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data. This image is your base image.
- **Composite Image Property**: Enter the name of the binary property that stores image to composite on top of the **Property Name** image.
- **Operator**: Select composite operator, which determines how the composite works. Options include:
  - **Add**
  - **Atop**
  - **Bumpmap**
  - **Copy**
  - **Copy Black**
  - **Copy Blue**
  - **Copy Cyan**
  - **Copy Green**
  - **Copy Magenta**
  - **Copy Opacity**
  - **Copy Red**
  - **Copy Yellow**
  - **Difference**
  - **Divide**
  - **In**
  - **Minus**
  - **Multiply**
  - **Out**
  - **Over**
  - **Plus**
  - **Subtract**
  - **Xor**
- **Position X**: Enter the x axis position (horizontal) of the composite image.
- **Position Y**: Enter the y axis position (vertical) of the composite image.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Create parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#create-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Background Color**: Set the background color for the image. You can either enter a hex or select the color swatch to open a color picker.
- **Image Width**: Enter the width of the image.
- **Image Height**: Enter the height of the image.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Crop parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#crop-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Width**: Enter the width you'd like to crop to.
- **Height**: Enter the height you'd like to crop to.
- **Position X**: Enter the x axis position (horizontal) to start the crop from.
- **Position Y**: Enter the y axis position (vertical) to start the crop from.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Draw parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#draw-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Primitive**: Select the primitive shape to draw. Choose from:
  - **Circle**
  - **Line**
  - **Rectangle**
- **Color**: Set the color for the primitive. You can either enter a hex or select the color swatch to open a color picker.
- **Start Position X**: Enter the x axis position (horizontal) to start drawing from.
- **Start Position Y**: Enter the y axis position (vertical) to start drawing from.
- **End Position X**: Enter the x axis position (horizontal) to stop drawing at.
- **End Position Y**: Enter the y axis position (vertical) to start drawing at.
- **Corner Radius**: Enter a number to set the corner radius. Adding a corner radius will round the corners of the drawn primitive.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Get Information parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#get-information-parameters "Permanent link")

For this operation, you only need to add the **Property Name** of the binary property that stores the image data.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Multi Step parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#multi-step-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Operations**: Add the operations you want the multi step operation to perform. You can use any of the other operations.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Resize parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#resize-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Width**: Enter the new width you'd like for the image.
- **Height**: Enter the new height you'd like for the image.
- **Option**: Select how you'd like to resize the image. Choose from:
  - **Ignore Aspect Ratio**: Ignore the aspect ratio and resize to the exact height and width you've entered.
  - **Maximum Area**: The height and width you've entered is the maximum area/size for the image. The image maintains its aspect ratio and won't be larger than the height and/or width you've entered.
  - **Minimum Area**: The height and width you've entered is the minimum area/size for the image. The image maintains its aspect ratio and won't be smaller than the height and/or width you've entered.
  - **Only if Larger**: Resize the image only if it's larger than the width and height you entered. The image maintains its aspect ratio.
  - **Only if Smaller**: Resize the image only if it's smaller than the width and height you entered. The image maintains its aspect ratio.
  - **Percent**: Resize the image using the width and height as percentages of the original image.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Rotate parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#rotate-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Rotate**: Enter the number of degrees to rotate the image, from --360 to 360.
- **Background Color**: Set the background color for the image. You can either enter a hex or select the color swatch to open a color picker. This color is used to fill in the empty background whenever the image is rotated by multiples of 90 degrees. If multipled of 90 degrees are used for the **Rotate** field, the background color isn't used.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Shear parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#shear-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Degrees X**: Enter the number of degrees to shear from the x axis.
- **Degrees Y**: Enter the number of degrees to shear from the y axis.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Text parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#text-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Text**: Enter the text you'd like to write on the image.
- **Font Size**: Select the font size for the text.
- **Font Color**: Set the font color. You can either enter a hex or select the color swatch to open a color picker.
- **Position X**: Enter the x axis position (horizontal) to begin the text at.
- **Position Y**: Enter the y axis position (vertical) to begin the text at.
- **Max Line Length**: Enter the maximum amount of characters in a line before adding a line break.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

### Transparent parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#transparent-parameters "Permanent link")

- **Property Name**: Enter the name of the binary property that stores the image data.
- **Color**: Set the color to make transparent. You can either enter a hex or select the color swatch to open a color picker.

Refer to [Node options](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/#node-options) for optional configuration options.

## Node options [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#node-options "Permanent link")

- **File Name**: Enter the filename of the output file.
- **Format**: Enter the image format of the output file. Choose from:
  - **bmp**
  - **gif**
  - **jpeg**
  - **png**
  - **tiff**
  - **WebP**

The **Text** operation also includes the option for **Font Name or ID**. Select the text font from the dropdown or specify an ID using an [expression](https://docs.n8n.io/code/expressions/).

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.editimage/\#templates-and-examples "Permanent link")

**Flux AI Image Generator**

by Max Tkacz

[View template details](https://n8n.io/workflows/2417-flux-ai-image-generator/)

**Generate Instagram Content from Top Trends with AI Image Generation**

by mustafa kendigüzel

[View template details](https://n8n.io/workflows/2803-generate-instagram-content-from-top-trends-with-ai-image-generation/)

**AI-Powered WhatsApp Chatbot 🤖📲 for Text, Voice, Images & PDFs with memory 🧠**

by Davide

[View template details](https://n8n.io/workflows/3586-ai-powered-whatsapp-chatbot-for-text-voice-images-and-pdfs-with-memory/)

[Browse Edit Image integration templates](https://n8n.io/integrations/edit-image/), or [search all templates](https://n8n.io/workflows/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Wufoo credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/wufoo/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/wufoo/#wufoo-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/wufoo.md "Edit this page")

# Wufoo credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/wufoo/\#wufoo-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Wufoo Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.wufootrigger/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/wufoo/\#prerequisites "Permanent link")

Create a [Wufoo](https://wufoo.com/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/wufoo/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/wufoo/\#related-resources "Permanent link")

Refer to [Wufoo's API documentation](https://wufoo.github.io/docs/) for more information about the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/wufoo/\#using-api-key "Permanent link")

To configure this credential, you'll need:

- An **API Key**: Get your API key from the [Wufoo Form Manager](https://app.wufoo.com/#/form-manager). To the right of a form, select **More > API Information**. Refer to [Using API Information and Webhooks](https://help.surveymonkey.com/en/wufoo/integrations/wufoo-api/) for more information.
- A **Subdomain**: Your subdomain is the part of your Wufoo URL that comes after `https://` and before `wufoo.com`. So if the full domain is `https://n8n.wufoo.com`, the subdomain is `n8n`. Admins can view the subdomain in the [**Account Manager**](https://help.surveymonkey.com/en/wufoo/account/account-manager/). Refer to [Your Subdomain](https://help.surveymonkey.com/en/wufoo/account/your-subdomain/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Affinity Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.affinitytrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.affinitytrigger/#affinity-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.affinitytrigger.md "Edit this page")

# Affinity Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.affinitytrigger/\#affinity-trigger-node "Permanent link")

[Affinity](https://www.affinity.co/) is a powerful relationship intelligence platform enabling teams to leverage their network to close the next big deal.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/affinity/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Affinity Trigger integrations](https://n8n.io/integrations/affinity-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.affinitytrigger/\#events "Permanent link")

- Field value
- Created
- Deleted
- Updated
- Field
- Created
- Deleted
- Updated
- File
- Created
- Deleted
- List entry
- Created
- Deleted
- List
- Created
- Deleted
- Updated
- Note
- Created
- Deleted
- Updated
- Opportunity
- Created
- Deleted
- Updated
- Organization
- Created
- Deleted
- Updated
- Person
- Created
- Deleted
- Updated

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.affinitytrigger/\#related-resources "Permanent link")

n8n provides an app node for Affinity. You can find the node docs [here](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.affinity/).

View [example workflows and related content](https://n8n.io/integrations/affinity-trigger/) on n8n's website.

Refer to [Affinity's documentation](https://api-docs.affinity.co/) for details about their API.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Conversational AI Agent node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/#conversational-ai-agent-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent.md "Edit this page")

# Conversational AI Agent node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#conversational-ai-agent-node "Permanent link")

Feature removed

n8n removed this functionality in February 2025.

The Conversational Agent has human-like conversations. It can maintain context, understand user intent, and provide relevant answers. This agent is typically used for building chatbots, virtual assistants, and customer support systems.

The Conversational Agent describes [tools](https://docs.n8n.io/glossary/#ai-tool) in the system prompt and parses JSON responses for tool calls. If your preferred AI model doesn't support tool calling or you're handling simpler interactions, this agent is a good general option. It's more flexible but may be less accurate than the [Tools Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/tools-agent/).

Refer to [AI Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) for more information on the AI Agent node itself.

You can use this agent with the [Chat Trigger](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-langchain.chattrigger/) node. Attach a memory sub-node so that users can have an ongoing conversation with multiple queries. Memory doesn't persist between sessions.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#node-parameters "Permanent link")

Configure the Conversational Agent using the following parameters.

### Prompt [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#prompt "Permanent link")

Select how you want the node to construct the prompt (also known as the user's query or input from the chat).

Choose from:

- **Take from previous node automatically**: If you select this option, the node expects an input from a previous node called `chatInput`.
- **Define below**: If you select this option, provide either static text or an expression for dynamic content to serve as the prompt in the **Prompt (User Message)** field.

### Require Specific Output Format [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#require-specific-output-format "Permanent link")

This parameter controls whether you want the node to require a specific output format. When turned on, n8n prompts you to connect one of these output parsers to the node:

- [Auto-fixing Output Parser](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserautofixing/)
- [Item List Output Parser](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparseritemlist/)
- [Structured Output Parser](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/)

## Node options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#node-options "Permanent link")

Refine the Conversational Agent node's behavior using these options:

### Human Message [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#human-message "Permanent link")

Tell the agent about the tools it can use and add context to the user's input.

You must include these expressions and variable:

- `{tools}`: A LangChain expression that provides a string of the tools you've connected to the Agent. Provide some context or explanation about who should use the tools and how they should use them.
- `{format_instructions}`: A LangChain expression that provides the schema or format from the output parser node you've connected. Since the instructions themselves are context, you don't need to provide context for this expression.
- `{{input}}`: A LangChain variable containing the user's prompt. This variable populates with the value of the **Prompt** parameter. Provide some context that this is the user's input.

Here's an example of how you might use these strings:

Example:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>``` | ```<br>TOOLS<br>------<br>Assistant can ask the user to use tools to look up information that may be helpful in answering the user's original question. The tools the human can use are:<br>{tools}<br>{format_instructions}<br>USER'S INPUT<br>--------------------<br>Here is the user's input (remember to respond with a markdown code snippet of a JSON blob with a single action, and NOTHING else):<br>{{input}}<br>``` |

### System Message [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#system-message "Permanent link")

If you'd like to send a message to the agent before the conversation starts, enter the message you'd like to send.

Use this option to guide the agent's decision-making.

### Max Iterations [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#max-iterations "Permanent link")

Enter the number of times the model should run to try and generate a good answer from the user's prompt.

Defaults to `10`.

### Return Intermediate Steps [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#return-intermediate-steps "Permanent link")

Select whether to include intermediate steps the agent took in the final output (turned on) or not (turned off).

This could be useful for further refining the agent's behavior based on the steps it took.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#templates-and-examples "Permanent link")

Refer to the main AI Agent node's [Templates and examples](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/#templates-and-examples) section.

## Common issues [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/conversational-agent/\#common-issues "Permanent link")

For common questions or issues and suggested solutions, refer to [Common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/common-issues/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>OpenAI Audio operations | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/#openai-audio-operations)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations.md "Edit this page")

# OpenAI Audio operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#openai-audio-operations "Permanent link")

Use this operation to generate an audio, or transcribe or translate a recording in OpenAI. Refer to [OpenAI](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/) for more information on the OpenAI node itself.

## Generate Audio [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#generate-audio "Permanent link")

Use this operation to create audio from a text prompt.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](https://docs.n8n.io/integrations/builtin/credentials/openai/).
- **Resource**: Select **Audio**.
- **Operation**: Select **Generate Audio**.
- **Model**: Select the model you want to use to generate the audio. Refer to [TTS \| OpenAI](https://platform.openai.com/docs/models/tts) for more information.
  - **TTS-1**: Use this to optimize for speed.
  - **TTS-1-HD**: Use this to optimize for quality.
- **Text Input**: Enter the text to generate the audio for. The maximum length is 4096 characters.
- **Voice**: Select a voice to use when generating the audio. Listen to the previews of the voices in [Text to speech guide \| OpenAI](https://platform.openai.com/docs/guides/text-to-speech/quickstart).

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#options "Permanent link")

- **Response Format**: Select the format for the audio response. Choose from **MP3** (default), **OPUS**, **AAC**, **FLAC**, **WAV**, and **PCM**.
- **Audio Speed**: Enter the speed for the generated audio from a value from `0.25` to `4.0`. Defaults to `1`.
- **Put Output in Field**: Defaults to `data`. Enter the name of the output field to put the binary file data in.

Refer to [Create speech \| OpenAI](https://platform.openai.com/docs/api-reference/audio/createSpeech) documentation for more information.

## Transcribe a Recording [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#transcribe-a-recording "Permanent link")

Use this operation to transcribe audio into text. OpenAI API limits the size of the audio file to 25 MB. OpenAI will use the `whisper-1` model by default.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](https://docs.n8n.io/integrations/builtin/credentials/openai/).
- **Resource**: Select **Audio**.
- **Operation**: Select **Transcribe a Recording**.
- **Input Data Field Name**: Defaults to `data`. Enter the name of the binary property that contains the audio file in one of these formats: `.flac`, `.mp3`, `.mp4`, `.mpeg`, `.mpga`, `.m4a`, `.ogg`, `.wav`, or `.webm`.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#options_1 "Permanent link")

- **Language of the Audio File**: Enter the language of the input audio in [ISO-639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes). Use this option to improve accuracy and latency.
- **Output Randomness (Temperature)**: Defaults to `1.0`. Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it.

Refer to [Create transcription \| OpenAI](https://platform.openai.com/docs/api-reference/audio/createTranscription) documentation for more information.

## Translate a Recording [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#translate-a-recording "Permanent link")

Use this operation to translate audio into English. OpenAI API limits the size of the audio file to 25 MB. OpenAI will use the `whisper-1` model by default.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [OpenAI credential](https://docs.n8n.io/integrations/builtin/credentials/openai/).
- **Resource**: Select **Audio**.
- **Operation**: Select **Translate a Recording**.
- **Input Data Field Name**: Defaults to `data`. Enter the name of the binary property that contains the audio file in one of these formats: `.flac`, `.mp3`, `.mp4`, `.mpeg`, `.mpga`, `.m4a`, `.ogg`, `.wav`, or `.webm`.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#options_2 "Permanent link")

- **Output Randomness (Temperature)**: Defaults to `1.0`. Adjust the randomness of the response. The range is between `0.0` (deterministic) and `1.0` (maximum randomness). We recommend altering this or **Output Randomness (Top P)** but not both. Start with a medium temperature (around 0.7) and adjust based on the outputs you observe. If the responses are too repetitive or rigid, increase the temperature. If they’re too chaotic or off-track, decrease it.

Refer to [Create transcription \| OpenAI](https://platform.openai.com/docs/api-reference/audio/createTranscription) documentation for more information.

## Common issues [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/audio-operations/\#common-issues "Permanent link")

For common errors or issues and suggested resolution steps, refer to [Common Issues](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/common-issues/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Contextual Compression Retriever node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression/#contextual-compression-retriever-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression.md "Edit this page")

# Contextual Compression Retriever node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression/\#contextual-compression-retriever-node "Permanent link")

The Contextual Compression Retriever node improves the answers returned from [vector store](https://docs.n8n.io/glossary/#ai-vector-store) document similarity searches by taking into account the context from the query.

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression/\#templates-and-examples "Permanent link")

**Generate Contextual YouTube Comments Automatically with GPT-4o**

by Yaron Been

[View template details](https://n8n.io/workflows/4580-generate-contextual-youtube-comments-automatically-with-gpt-4o/)

**Dynamic MCP Server Selection with OpenAI GPT-4.1 and Contextual AI Reranker**

by Jinash Rouniyar

[View template details](https://n8n.io/workflows/8272-dynamic-mcp-server-selection-with-openai-gpt-41-and-contextual-ai-reranker/)

**Generate Contextual Recommendations from Slack using Pinecone**

by Rahul Joshi

[View template details](https://n8n.io/workflows/6018-generate-contextual-recommendations-from-slack-using-pinecone/)

[Browse Contextual Compression Retriever integration templates](https://n8n.io/integrations/contextual-compression-retriever/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievercontextualcompression/\#related-resources "Permanent link")

Refer to [LangChain's contextual compression retriever documentation](https://js.langchain.com/docs/how_to/contextual_compression/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>White labelling | n8n Docs  </title>
  <url>https://docs.n8n.io/embed/white-labelling/</url>
  <content>
[Skip to content](https://docs.n8n.io/embed/white-labelling/#white-labelling)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/embed/white-labelling.md "Edit this page")

# White labelling [\#](https://docs.n8n.io/embed/white-labelling/\#white-labelling "Permanent link")

Feature availability

Embed requires an embed license. For more information about when to use Embed, as well as costs and licensing processes, refer to [Embed](https://n8n.io/embed/) on the n8n website.

White labelling n8n means customizing the frontend styling and assets to match your brand identity. The process involves changing two packages in n8n's source code [github.com/n8n-io/n8n](https://github.com/n8n-io/n8n):

- [packages/frontend/@n8n/design-system](https://github.com/n8n-io/n8n/tree/master/packages/frontend/@n8n/design-system): n8n's [storybook](https://storybook.js.org/) design system with CSS styles and Vue.js components
- [packages/frontend/editor-ui](https://github.com/n8n-io/n8n/tree/master/packages/frontend/editor-ui): n8n's [Vue.js](https://vuejs.org/) frontend build with [Vite.js](https://vitejs.dev/)

## Prerequisites [\#](https://docs.n8n.io/embed/white-labelling/\#prerequisites "Permanent link")

You need the following installed on your development machine:

- [git](https://git-scm.com/downloads)
- Node.js and npm. Minimum version Node 18.17.0. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

Create a fork of [n8n's repository](https://github.com/n8n-io/n8n) and clone your new repository.

|     |     |
| --- | --- |
| ```<br>1<br>2<br>``` | ```<br>git clone https://github.com/<your-organization>/n8n.git n8n<br>cd n8n<br>``` |

Install all dependencies, build and start n8n.

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>``` | ```<br>npm install<br>npm run build<br>npm run start<br>``` |

Whenever you make changes you need to rebuild and restart n8n. While developing you can use `npm run dev` to automatically rebuild and restart n8n anytime you make code changes.

## Theme colors [\#](https://docs.n8n.io/embed/white-labelling/\#theme-colors "Permanent link")

To customize theme colors open [packages/frontend/@n8n/design-system](https://github.com/n8n-io/n8n/tree/master/packages/frontend/@n8n/design-system) and start with:

- [packages/frontend/@n8n/design-system/src/css/\_tokens.scss](https://github.com/n8n-io/n8n/blob/master/packages/frontend/@n8n/design-system/src/css/_tokens.scss)
- [packages/frontend/@n8n/design-system/src/css/\_tokens.dark.scss](https://github.com/n8n-io/n8n/blob/master/packages/frontend/@n8n/design-system/src/css/_tokens.dark.scss)

At the top of `_tokens.scss` you will find `--color-primary` variables as HSL colors:

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>``` | ```<br>@mixin theme {<br>	--color-primary-h: 6.9;<br>	--color-primary-s: 100%;<br>	--color-primary-l: 67.6%;<br>``` |

In the following example the primary color changes to #0099ff. To convert to HSL you can use a [color converter tool](https://www.w3schools.com/colors/colors_converter.asp).

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>``` | ```<br>@mixin theme {<br>	--color-primary-h: 204;<br>	--color-primary-s: 100%;<br>	--color-primary-l: 50%;<br>``` |

[![Example Theme Color Customization](https://docs.n8n.io/_images/embed/white-label/color-transition.gif)](https://docs.n8n.io/_images/embed/white-label/color-transition.gif)

## Theme logos [\#](https://docs.n8n.io/embed/white-labelling/\#theme-logos "Permanent link")

To change the editor’s logo assets look into [packages/frontend/editor-ui/public](https://github.com/n8n-io/n8n/tree/master/packages/frontend/editor-ui/public) and replace:

- favicon-16x16.png
- favicon-32x32.png
- favicon.ico
- n8n-logo.svg
- n8n-logo-collapsed.svg
- n8n-logo-expanded.svg

Replace these logo assets. n8n uses them in Vue.js components, including:

- [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/MainSidebar.vue): top/left logo in the main sidebar.
- [Logo.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/Logo/Logo.vue): reused in other components.

In the following example replace `n8n-logo-collapsed.svg` and `n8n-logo-expanded.svg` to update the main sidebar's logo assets.

[![Example Logo Main Sidebar](https://docs.n8n.io/_images/embed/white-label/logo-main-sidebar.png)](https://docs.n8n.io/_images/embed/white-label/logo-main-sidebar.png)

If your logo assets require different sizing or placement you can customize SCSS styles at the bottom of [MainSidebar.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/MainSidebar.vue).

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>``` | ```<br>.logoItem {<br>	display: flex;<br>	justify-content: space-between;<br>	height: $header-height;<br>	line-height: $header-height;<br>	margin: 0 !important;<br>	border-radius: 0 !important;<br>	border-bottom: var(--border-width-base) var(--border-style-base) var(--color-background-xlight);<br>	cursor: default;<br>	&:hover, &:global(.is-active):hover {<br>		background-color: initial !important;<br>	}<br>	* { vertical-align: middle; }<br>	.icon {<br>		height: 18px;<br>		position: relative;<br>		left: 6px;<br>	}<br>}<br>``` |

## Text localization [\#](https://docs.n8n.io/embed/white-labelling/\#text-localization "Permanent link")

To change all text occurrences like `n8n` or `n8n.io` to your brand identity you can customize n8n's English internationalization file: [packages/frontend/@n8n/i18n/src/locales/en.json](https://github.com/n8n-io/n8n/blob/master/packages/frontend/@n8n/i18n/src/locales/en.json).

n8n uses the [Vue I18n](https://kazupon.github.io/vue-i18n/) internationalization plugin for Vue.js to translate the majority of UI texts. To search and replace text occurrences inside `en.json` you can use [Linked locale messages](https://kazupon.github.io/vue-i18n/guide/messages.html#linked-locale-messages).

In the following example add the `_brand.name` translation key to white label n8n's [AboutModal.vue](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/components/AboutModal.vue).

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>``` | ```<br>{<br>	"_brand.name": "My Brand",<br>	//replace n8n with link to _brand.name<br>	"about.aboutN8n": "About @:_brand.name",<br>	"about.n8nVersion": "@:_brand.name Version",<br>}<br>``` |

[![Example About Modal Localization](https://docs.n8n.io/_images/embed/white-label/about-modal.png)](https://docs.n8n.io/_images/embed/white-label/about-modal.png)

### Window title [\#](https://docs.n8n.io/embed/white-labelling/\#window-title "Permanent link")

To change n8n's window title to your brand name, edit the following:

- [packages/frontend/editor-ui/index.html](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/index.html)
- [packages/frontend/editor-ui/src/composables/useDocumentTitle.ts](https://github.com/n8n-io/n8n/blob/master/packages/frontend/editor-ui/src/composables/useDocumentTitle.ts)

The following example replaces all occurrences of `n8n` and `n8n.io` with `My Brand` in `index.html` and `useDocumentTitle.ts`.

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>``` | ```<br><!DOCTYPE html><br><html lang="en"><br><head><br>	<!-- Replace html title attribute --><br>	<title>My Brand - Workflow Automation</title><br></head><br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>``` | ```<br>import { useSettingsStore } from '@/stores/settings.store';<br>// replace n8n<br>const DEFAULT_TITLE = 'My Brand';<br>const DEFAULT_TAGLINE = 'Workflow Automation';<br>``` |

[![Example Window Title Localization](https://docs.n8n.io/_images/embed/white-label/window-title.png)](https://docs.n8n.io/_images/embed/white-label/window-title.png)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Webflow Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger/#webflow-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger.md "Edit this page")

# Webflow Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.webflowtrigger/\#webflow-trigger-node "Permanent link")

[Webflow](https://webflow.com/) is an application that allows you to build responsive websites with browser-based visual editing software.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/webflow/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Webflow Trigger integrations](https://n8n.io/integrations/webflow-trigger/) page.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Linear Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/#linear-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger.md "Edit this page")

# Linear Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/\#linear-trigger-node "Permanent link")

[Linear](https://linear.app/) is a SaaS issue tracking tool.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/linear/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Linear Trigger integrations](https://n8n.io/integrations/linear-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.lineartrigger/\#events "Permanent link")

- Comment Reaction
- Cycle
- Issue
- Issue Comment
- Issue Label
- Project

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Onfleet Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.onfleettrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.onfleettrigger/#onfleet-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.onfleettrigger.md "Edit this page")

# Onfleet Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.onfleettrigger/\#onfleet-trigger-node "Permanent link")

[Onfleet](https://onfleet.com/) is a logistics platform offering a last-mile delivery solution.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/onfleet/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Onfleet Trigger integrations](https://n8n.io/integrations/onfleet-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.onfleettrigger/\#events "Permanent link")

Trigger a workflow on:

- SMS recipient opt out
- SMS recipient response missed
- Task arrival
- Task assigned
- Task cloned
- Task completed
- Task created
- Task delayed
- Task ETA
- Task failed
- Task started
- Task unassigned
- Task updated
- Worker created
- Worker deleted
- Worker duty

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Workflow tags | n8n Docs </title>
  <url>https://docs.n8n.io/workflows/tags/</url>
  <content>
[Skip to content](https://docs.n8n.io/workflows/tags/#tags)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/workflows/tags.md "Edit this page")

# Tags [\#](https://docs.n8n.io/workflows/tags/\#tags "Permanent link")

Workflow tags allow you to label your workflows. You can then filter workflows by tag.

Tags are global. This means when you create a tag, it's available to all users on your n8n instance.

## Add a tag to a workflow [\#](https://docs.n8n.io/workflows/tags/\#add-a-tag-to-a-workflow "Permanent link")

To add a tag to your workflow:

1. In your workflow, select **\+ Add tag**.
2. Select an existing tag, or enter a new tag name.
3. Once you select a tag and click away from the tag modal, n8n displays the tag next to the workflow name.

You can add more than one tag.

## Filter by tag [\#](https://docs.n8n.io/workflows/tags/\#filter-by-tag "Permanent link")

When browsing the workflows on your instance, you can filter by tag.

1. On the **Workflows** page, select **Filters**.
2. Select **Tags**.
3. Select the tag or tags you want to filter by. n8n lists the workflows with that tag.

## Manage tags [\#](https://docs.n8n.io/workflows/tags/\#manage-tags "Permanent link")

You can edit existing tags. Instance owners can delete tags.

1. Select **Manage tags**. This is available from **Filters** \> **Tags** on the **Workflows** page, or in the **\+ Add tag** modal in your workflow.
2. Hover over the tag you want to change.
3. Select **Edit**![Add node icon](https://docs.n8n.io/_images/common-icons/edit.png) to rename it, or **Delete**![Add node icon](https://docs.n8n.io/_images/common-icons/delete.png) to delete it.

Global tags

Tags are global. If you edit or delete a tag, this affects all users of your n8n instance.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top
  </content>
</page>

<page>
  <title>Jira credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/jira/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/jira/#jira-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/jira.md "Edit this page")

# Jira credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/jira/\#jira-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Jira](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.jira/)
- [Jira Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.jiratrigger/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/jira/\#prerequisites "Permanent link")

Create a [Jira](https://www.atlassian.com/software/jira) Software Cloud or Server account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/jira/\#supported-authentication-methods "Permanent link")

- [SW Cloud API token](https://docs.n8n.io/integrations/builtin/credentials/jira/#using-sw-cloud-api-token): Use this method with [Jira Software Cloud](https://www.atlassian.com/software/jira).
- [SW Server account](https://docs.n8n.io/integrations/builtin/credentials/jira/#using-sw-server-account): Use this method with [Jira Software Server](https://www.atlassian.com/software/jira/download.).

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/jira/\#related-resources "Permanent link")

Refer to [Jira's API documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#about) for more information about the service.

## Using SW Cloud API token [\#](https://docs.n8n.io/integrations/builtin/credentials/jira/\#using-sw-cloud-api-token "Permanent link")

To configure this credential, you'll need an account on [Jira Software Cloud](https://www.atlassian.com/software/jira).

Then:

1. Log in to your Atlassian profile > **Security > API tokens** page, or jump straight there using this [link](https://id.atlassian.com/manage-profile/security/api-tokens).
2. Select **Create API Token**.
3. Enter a good **Label** for your token, like `n8n integration`.
4. Select **Create**.
5. Copy the API token.
6. In n8n, enter the **Email** address associated with your Jira account.
7. Paste the API token you copied as your **API Token**.
8. Enter the **Domain** you access Jira on, for example `https://example.atlassian.net`.

Refer to [Manage API tokens for your Atlassian account](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) for more information.

New tokens

New tokens may take up to a minute before they work. If your credential verification fails the first time, wait a minute before retrying.

## Using SW Server account [\#](https://docs.n8n.io/integrations/builtin/credentials/jira/\#using-sw-server-account "Permanent link")

To configure this credential, you'll need an account on [Jira Software Server](https://www.atlassian.com/software/jira/download.).

Then:

1. Enter the **Email** address associated with your Jira account.
2. Enter your Jira account **Password**.
3. Enter the **Domain** you access Jira on.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>No Title</title>
  <url>https://docs.n8n.io/_workflows/integrations/builtin/core-nodes/n8n-nodes-base.extractfromfile/webhook-example.json</url>
  <content>
```json
{
  "name": "Extract from file example",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "06696ea7-9dc7-464a-873b-3feb095b0874",
        "options": {
          "rawBody": true
        }
      },
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        -380,
        -80
      ],
      "id": "dfbd51af-6050-47c5-a26c-74cba77f65f7",
      "name": "Webhook",
      "webhookId": "06696ea7-9dc7-464a-873b-3feb095b0874"
    },
    {
      "parameters": {
        "options": {
          "headerRow": false
        }
      },
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1,
      "position": [
        -160,
        -80
      ],
      "id": "1b1e4643-8269-402b-83af-dfd90fd6a0b5",
      "name": "Extract from File"
    }
  ],
  "pinData": {},
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Extract from File",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": true,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "dd2bf7f1-692a-41a8-9c2e-7931de57fa13",
  "meta": {
    "instanceId": "1060f46e51fc7902c377ab29d7cbfb87696ddf6b3c5c27cbbb65c3cb36e21baf"
  },
  "id": "9i3iDZf5MpjlJ2sh",
  "tags": []
}
```
  </content>
</page>

<page>
  <title>QuickBooks Online node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/#quickbooks-online-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks.md "Edit this page")

# QuickBooks Online node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/\#quickbooks-online-node "Permanent link")

Use the QuickBooks node to automate work in QuickBooks, and integrate QuickBooks with other applications. n8n has built-in support for a wide range of QuickBooks features, including creating, updating, deleting, and getting bills, customers, employees, estimates, and invoices.

On this page, you'll find a list of operations the QuickBooks node supports and links to more resources.

Credentials

Refer to [QuickBooks credentials](https://docs.n8n.io/integrations/builtin/credentials/quickbooks/) for guidance on setting up authentication.

This node can be used as an AI tool

This node can be used to enhance the capabilities of an AI agent. When used in this way, many parameters can be set automatically, or with information directed by AI - find out more in the [AI tool parameters documentation](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/\#operations "Permanent link")

- Bill
  - Create
  - Delete
  - Get
  - Get All
  - Update
- Customer
  - Create
  - Get
  - Get All
  - Update
- Employee
  - Create
  - Get
  - Get All
  - Update
- Estimate
  - Create
  - Delete
  - Get
  - Get All
  - Send
  - Update
- Invoice
  - Create
  - Delete
  - Get
  - Get All
  - Send
  - Update
  - Void
- Item
  - Get
  - Get All
- Payment
  - Create
  - Delete
  - Get
  - Get All
  - Send
  - Update
  - Void
- Purchase
  - Get
  - Get All
- Transaction
  - Get Report
- Vendor
  - Create
  - Get
  - Get All
  - Update

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/\#templates-and-examples "Permanent link")

**Create a customer and send the invoice automatically**

by Harshil Agrawal

[View template details](https://n8n.io/workflows/949-create-a-customer-and-send-the-invoice-automatically/)

**Create QuickBooks Online Customers With Sales Receipts For New Stripe Payments**

by Artur

[View template details](https://n8n.io/workflows/2807-create-quickbooks-online-customers-with-sales-receipts-for-new-stripe-payments/)

**Create a QuickBooks invoice on a new Onfleet Task creation**

by James Li

[View template details](https://n8n.io/workflows/1546-create-a-quickbooks-invoice-on-a-new-onfleet-task-creation/)

[Browse QuickBooks Online integration templates](https://n8n.io/integrations/quickbooks-online/), or [search all templates](https://n8n.io/workflows/)

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.quickbooks/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>getWorkflowStaticData | n8n Docs  </title>
  <url>https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/</url>
  <content>
[Skip to content](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/#getworkflowstaticdatatype)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/code/cookbook/builtin/get-workflow-static-data.md "Edit this page")

# `getWorkflowStaticData(type)` [\#](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/\#getworkflowstaticdatatype "Permanent link")

This gives access to the static workflow data.

Experimental feature

- Static data isn't available when testing workflows. The workflow must be active and called by a [trigger](https://docs.n8n.io/glossary/#trigger-node-n8n) or webhook to save static data.
- This feature may behave unreliably under high-frequency workflow executions.

You can save data directly in the workflow. This data should be small.

As an example: you can save a timestamp of the last item processed from
an RSS feed or database. It will always return an object. Properties can then read, delete or
set on that object. When the workflow execution succeeds, n8n checks automatically if the data
has changed and saves it, if necessary.

There are two types of static data, global and node. Global static data is the
same in the whole workflow. Every node in the workflow can access it. The node static data is unique to the node. Only the node that set it can retrieve it again.

Example with global data:

[JavaScript](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/#__tabbed_1_1)[Python](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/#__tabbed_1_2)

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>``` | ```<br>// Get the global workflow static data<br>const workflowStaticData = $getWorkflowStaticData('global');<br>// Access its data<br>const lastExecution = workflowStaticData.lastExecution;<br>// Update its data<br>workflowStaticData.lastExecution = new Date().getTime();<br>// Delete data<br>delete workflowStaticData.lastExecution;<br>``` |

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>``` | ```<br># Get the global workflow static data<br>workflowStaticData = _getWorkflowStaticData('global')<br># Access its data<br>lastExecution = workflowStaticData.lastExecution<br># Update its data<br>workflowStaticData.lastExecution = new Date().getTime()<br># Delete data<br>delete workflowStaticData.lastExecution<br>``` |

Example with node data:

[JavaScript](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/#__tabbed_2_1)[Python](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/#__tabbed_2_2)

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>``` | ```<br>// Get the static data of the node<br>const nodeStaticData = $getWorkflowStaticData('node');<br>// Access its data<br>const lastExecution = nodeStaticData.lastExecution;<br>// Update its data<br>nodeStaticData.lastExecution = new Date().getTime();<br>// Delete data<br>delete nodeStaticData.lastExecution;<br>``` |

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>``` | ```<br># Get the static data of the node<br>nodeStaticData = _getWorkflowStaticData('node')<br># Access its data<br>lastExecution = nodeStaticData.lastExecution<br># Update its data<br>nodeStaticData.lastExecution = new Date().getTime()<br># Delete data<br>delete nodeStaticData.lastExecution<br>``` |

## Templates and examples [\#](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/\#templates-and-examples "Permanent link")

Workflow Automation - n8n

GET

![](https://n8n-preview-service.internal.n8n.cloud/icons/n8n-nodes-base/dist/nodes/Webhook/webhook.svg)

Webhook

continue with valid token

![](https://n8n-preview-service.internal.n8n.cloud/icons/n8n-nodes-base/dist/nodes/HttpRequest/httprequest.svg)

get new accessToken

GET: http://your-api.com

![](https://n8n-preview-service.internal.n8n.cloud/icons/n8n-nodes-base/dist/nodes/Code/code.svg)

2\. set token in static data

Schedule Trigger

# StaticData Demo

This workflow demonstrates how to use the [`workflowStaticData()` function](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/) to set any type of variable that will persist within workflow executions.

This can be useful for working with access tokens that expire after a certain time period.

[https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/](https://docs.n8n.io/code/cookbook/builtin/get-workflow-static-data/)

## Important

Static Data only persists across **_production_** executions, i.e. triggered by Webhooks or Schedule Triggers (not manual executions!)

For this the workflow will have to be activated.

### HTTP Request

Toggle

`Include Response Headers and Status`

option if access token is not sent in the body

true

false

if token is valid

(1 minute expiration)

![](https://n8n-preview-service.internal.n8n.cloud/icons/n8n-nodes-base/dist/nodes/Code/code.svg)

1\. initiate static data

Press enter or space to select a node. You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel.

Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel.

AI Assistant

Hi 👋

I can answer most questions about building workflows in n8n.

For specific tasks, you’ll see the

Ask Assistant

button in the UI.

How can I help?

[View template details](https://n8n.io/workflows/2538-demo-workflow-how-to-use-workflowstaticdata/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Triggers library | n8n Docs  </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/#triggers-library)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/index.md "Edit this page")

# Triggers library [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/\#triggers-library "Permanent link")

This section provides information about [n8n's Triggers](https://docs.n8n.io/glossary/#trigger-node-n8n).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Keyboard shortcuts | n8n Docs  </title>
  <url>https://docs.n8n.io/keyboard-shortcuts/</url>
  <content>
[Skip to content](https://docs.n8n.io/keyboard-shortcuts/#keyboard-shortcuts-and-controls)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/keyboard-shortcuts.md "Edit this page")

# Keyboard shortcuts and controls [\#](https://docs.n8n.io/keyboard-shortcuts/\#keyboard-shortcuts-and-controls "Permanent link")

n8n provides keyboard shortcuts for some actions.

## Workflow controls [\#](https://docs.n8n.io/keyboard-shortcuts/\#workflow-controls "Permanent link")

- **Ctrl** \+ **Alt** \+ **n**: create new workflow
- **Ctrl** \+ **o**: open workflow
- **Ctrl** \+ **s**: save the current workflow
- **Ctrl** \+ **z**: undo
- **Ctrl** \+ **shift** \+ **z**: redo
- **Ctrl** \+ **Enter**: execute workflow

## Canvas [\#](https://docs.n8n.io/keyboard-shortcuts/\#canvas "Permanent link")

### Move the canvas [\#](https://docs.n8n.io/keyboard-shortcuts/\#move-the-canvas "Permanent link")

- **Ctrl** \+ **Left Mouse Button** \+ drag: move node view
- **Ctrl** \+ **Middle mouse button** \+ drag: move node view
- **Space** \+ drag: move node view
- **Middle mouse button** \+ drag: move node view
- Two fingers on a touch screen: move node view

### Canvas zoom [\#](https://docs.n8n.io/keyboard-shortcuts/\#canvas-zoom "Permanent link")

- **+** or **=**: zoom in
- **-** or **\_**: zoom out
- **0**: reset zoom level
- **1**: zoom to fit workflow
- **Ctrl** \+ **Mouse wheel**: zoom in/out

### Nodes on the canvas [\#](https://docs.n8n.io/keyboard-shortcuts/\#nodes-on-the-canvas "Permanent link")

- **Double click** on a node: open the node details
- **Ctrl/Cmd** \+ **Double click** on a sub-workflow node: open the sub-workflow in a new tab
- **Ctrl** \+ **a**: select all nodes
- **Ctrl** \+ **v**: paste nodes
- **Shift** \+ **s**: add sticky note

### With one or more nodes selected in canvas [\#](https://docs.n8n.io/keyboard-shortcuts/\#with-one-or-more-nodes-selected-in-canvas "Permanent link")

- **ArrowDown**: select sibling node below the current one
- **ArrowLeft**: select node left of the current one
- **ArrowRight**: select node right of the current one
- **ArrowUp**: select sibling node above the current one
- **Ctrl** \+ **c**: copy
- **Ctrl** \+ **x**: cut
- **D**: deactivate
- **Delete**: delete
- **Enter**: open
- **F2**: rename
- **P**: pin data in node. Refer to [Data pinning](https://docs.n8n.io/data/data-pinning/) for more information.
- **Shift** \+ **ArrowLeft**: select all nodes left of the current one
- **Shift** \+ **ArrowRight**: select all nodes right of the current one
- **Ctrl/Cmd** \+ **Shift** \+ **o** on a sub-workflow node: open the sub-workflow in a new tab

## Node panel [\#](https://docs.n8n.io/keyboard-shortcuts/\#node-panel "Permanent link")

- **Tab**: open the Node Panel
- **Enter**: insert selected node into workflow
- **Escape**: close Node panel

### Node panel categories [\#](https://docs.n8n.io/keyboard-shortcuts/\#node-panel-categories "Permanent link")

- **Enter**: insert node into workflow, collapse/expand category, open subcategory
- **ArrowRight**: expand category, open subcategory
- **ArrowLeft**: collapse category, close subcategory view

## Within nodes [\#](https://docs.n8n.io/keyboard-shortcuts/\#within-nodes "Permanent link")

- **=**: in an empty parameter input, this switches to [expressions](https://docs.n8n.io/glossary/#expression-n8n) mode.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Set the self-hosted instance timezone | n8n Docs </title>
  <url>https://docs.n8n.io/hosting/configuration/configuration-examples/time-zone/</url>
  <content>
[Skip to content](https://docs.n8n.io/hosting/configuration/configuration-examples/time-zone/#set-the-self-hosted-instance-timezone)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/hosting/configuration/configuration-examples/time-zone.md "Edit this page")

# Set the self-hosted instance timezone [\#](https://docs.n8n.io/hosting/configuration/configuration-examples/time-zone/\#set-the-self-hosted-instance-timezone "Permanent link")

The default timezone is America/New\_York. For instance, the Schedule node uses it to know at what time the workflow should start. To set a different default timezone, set `GENERIC_TIMEZONE` to the appropriate value. For example, if you want to set the timezone to Berlin (Germany):

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>export GENERIC_TIMEZONE=Europe/Berlin<br>``` |

You can find the name of your timezone [here](https://momentjs.com/timezone/).

Refer to [Environment variables reference](https://docs.n8n.io/hosting/configuration/environment-variables/timezone-localization/) for more information on this variable.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Specify location for your custom nodes | n8n Docs </title>
  <url>https://docs.n8n.io/hosting/configuration/configuration-examples/custom-nodes-location/</url>
  <content>
[Skip to content](https://docs.n8n.io/hosting/configuration/configuration-examples/custom-nodes-location/#specify-location-for-your-custom-nodes)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/hosting/configuration/configuration-examples/custom-nodes-location.md "Edit this page")

# Specify location for your custom nodes [\#](https://docs.n8n.io/hosting/configuration/configuration-examples/custom-nodes-location/\#specify-location-for-your-custom-nodes "Permanent link")

Every user can add custom nodes that get loaded by n8n on startup. The default
location is in the subfolder `.n8n/custom` of the user who started n8n.

You can define more folders with an environment variable:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>export N8N_CUSTOM_EXTENSIONS="/home/jim/n8n/custom-nodes;/data/n8n/nodes"<br>``` |

Refer to [Environment variables reference](https://docs.n8n.io/hosting/configuration/environment-variables/nodes/) for more information on this variable.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Google Calendar Event operations | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/#google-calendar-event-operations)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations.md "Edit this page")

# Google Calendar Event operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#google-calendar-event-operations "Permanent link")

Use these operations to create, delete, get, and update events in Google Calendar. Refer to [Google Calendar](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/) for more information on the Google Calendar node itself.

## Create [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#create "Permanent link")

Use this operation to add an event to a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](https://docs.n8n.io/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Create**.
- **Calendar**: Choose a calendar you want to add an event to. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Start Time**: The start time for the event. By default, uses an expression evaluating to the current time ( `{{ $now }}`).
- **End Time**: The end time for the event. By default, this uses an expression evaluating to an hour from now ( `{{ $now.plus(1, 'hour') }}`).
- **Use Default Reminders**: Whether to enable default reminders for the event according to the calendar configuration.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#options "Permanent link")

- **All Day**: Whether the event is all day or not.
- **Attendees**: Attendees to invite to the event.
- **Color Name or ID**: The color of the event. Choose from the list or specify the ID using an expression.
- **Conference Data**: Creates a conference link (Hangouts, Meet, etc.) and attaches it to the event.
- **Description**: A description for the event.
- **Guests Can Invite Others**: Whether attendees other than the organizer can invite others to the event.

- **Guests Can Modify**: Whether attendees other than the organizer can modify the event.

- **Guests Can See Other Guests**: Whether attendees other than the organizer can see who the event's attendees are.
- **ID**: Opaque identifier of the event.
- **Location**: Geographic location of the event as free-form text.
- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
- **Repeat Frequency**: The repetition interval for recurring events.
- **Repeat How Many Times?**: The number of instances to create for recurring events.
- **Repeat Until**: The date at which recurring events should stop.

- **RRULE**: Recurrence rule. When set, ignores the Repeat Frequency, Repeat How Many Times, and Repeat Until parameters.

- **Send Updates**: Whether to send notifications about the creation of the new event.
- **Show Me As**: Whether the event blocks time on the calendar.
- **Summary**: The title of the event.

Refer to the [Events: insert \| Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/insert) API documentation for more information.

## Delete [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#delete "Permanent link")

Use this operation to delete an event from a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](https://docs.n8n.io/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Delete**.
- **Calendar**: Choose a calendar you want to delete an event from. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Event ID**: The ID of the event to delete.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#options_1 "Permanent link")

- **Send Updates**: Whether to send notifications about the deletion of the event.

Refer to the [Events: delete \| Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/delete) API documentation for more information.

## Get [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#get "Permanent link")

Use this operation to retrieve an event from a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](https://docs.n8n.io/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Get**.
- **Calendar**: Choose a calendar you want to get an event from. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Event ID**: The ID of the event to get.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#options_2 "Permanent link")

- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
- **Return Next Instance of Recurrent Event**: Whether to return the next instance of a recurring event instead of the event itself.
- **Timezone**: The timezone used in the response. By default, uses the n8n timezone.

Refer to the [Events: get \| Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/get) API documentation for more information.

## Get Many [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#get-many "Permanent link")

Use this operation to retrieve more than one event from a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](https://docs.n8n.io/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Get Many**.
- **Calendar**: Choose a calendar you want to get an event from. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Return All**: Whether to return all results or only up to a given limit.
- **Limit**: (When "Return All" isn't selected) The maximum number of results to return.
- **After**: Retrieve events that occur after this time. At least part of the event must be after this time. By default, this uses an expression evaluating to the current time ( `{{ $now }}`). Switch the field to "fixed" to select a date from a date widget.
- **Before**: Retrieve events that occur before this time. At least part of the event must be before this time. By default, this uses an expression evaluating to the current time plus a week ( `{{ $now.plus({ week: 1 }) }}`). Switch the field to "fixed" to select a date from a date widget.

### Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#options_3 "Permanent link")

- **Fields**: Specify the fields to return. By default, returns a set of commonly used fields predefined by Google. Use "\*" to return all fields. You can find out more in [Google Calendar's documentation on working with partial resources](https://developers.google.com/calendar/api/guides/performance#partial).

- **iCalUID**: Specifies an event ID (in the iCalendar format) to include in the response.

- **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
- **Order By**: The order to use for the events in the response.
- **Query**: Free text search terms to find events that match. This searches all fields except for extended properties.
- **Recurring Event Handling**: What to do for recurring events:
  - **All Occurrences**: Return all instances of the recurring event for the specified time range.
  - **First Occurrence**: Return the first event of a recurring event within the specified time range.
  - **Next Occurrence**: Return the next instance of a recurring event within the specified time range.
- **Show Deleted**: Whether to include deleted events (with status equal to "cancelled") in the results.
- **Show Hidden Invitations**: Whether to include hidden invitations in the results.
- **Timezone**: The timezone used in the response. By default, uses the n8n timezone.
- **Updated Min**: The lower bounds for an event's last modification time (as an [RFC 3339 timestamp](https://datatracker.ietf.org/doc/html/rfc3339))

Refer to the [Events: list \| Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/list) API documentation for more information.

## Update [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlecalendar/event-operations/\#update "Permanent link")

Use this operation to update an event in a Google Calendar.

Enter these parameters:

- **Credential to connect with**: Create or select an existing [Google Calendar credentials](https://docs.n8n.io/integrations/builtin/credentials/google/).
- **Resource**: Select **Event**.
- **Operation**: Select **Update**.
- **Calendar**: Choose a calendar you want to add an event to. Select **From list** to choose the title from the dropdown list or **By ID** to enter a calendar ID.
- **Event ID**: The ID of the event to update.

- **Modify**: For recurring events, choose whether to update the recurring event or a specific instance of the recurring event.

- **Use Default Reminders**: Whether to enable default reminders for the event according to the calendar configuration.
- **Update Fields**: The fields of the event to update:
  - **All Day**: Whether the event is all day or not.
  - **Attendees**: Attendees to invite to the event. You can choose to either add attendees or replace the existing attendee list.
  - **Color Name or ID**: The color of the event. Choose from the list or specify the ID using an expression.
  - **Description**: A description for the event.
  - **End**: The end time of the event.
  - **Guests Can Invite Others**: Whether attendees other than the organizer can invite others to the event.

  - **Guests Can Modify**: Whether attendees other than the organizer can make changes to the event.

  - **Guests Can See Other Guests**: Whether attendees other than the organizer can see who the event's attendees are.
  - **ID**: Opaque identifier of the event.
  - **Location**: Geographic location of the event as free-form text.
  - **Max Attendees**: The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only returns the participant.
  - **Repeat Frequency**: The repetition interval for recurring events.
  - **Repeat How Many Times?**: The number of instances to create for recurring events.
  - **Repeat Until**: The date at which recurring events should stop.

  - **RRULE**: Recurrence rule. When set, ignores the Repeat Frequency, Repeat How Many Times, and Repeat Until parameters.

  - **Send Updates**: Whether to send notifications about the creation of the new event.
  - **Show Me As**: Whether the event blocks time on the calendar.
  - **Start**: The start time of the event.
  - **Summary**: The title of the event.
  - **Visibility**: The visibility of the event:

    - **Confidential**: The event is private. This value is provided for compatibility.

    - **Default**: Uses the default visibility for events on the calendar.
    - **Public**: The event is public and the event details are visible to all readers of the calendar.
    - **Private**: The event is private and only event attendees may view event details.

Refer to the [Events: update \| Google Calendar](https://developers.google.com/calendar/api/v3/reference/events/update) API documentation for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Cloud free trial | n8n Docs </title>
  <url>https://docs.n8n.io/manage-cloud/cloud-free-trial/</url>
  <content>
[Skip to content](https://docs.n8n.io/manage-cloud/cloud-free-trial/#cloud-free-trial)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/manage-cloud/cloud-free-trial.md "Edit this page")

# Cloud free trial [\#](https://docs.n8n.io/manage-cloud/cloud-free-trial/\#cloud-free-trial "Permanent link")

When you create a new n8n cloud trial, you have 14 days to try all the features of the [Pro plan](https://n8n.io/pricing/), including:

- Global variables
- Insights dashboard
- Execution search
- 5 days workflow history to rollback

The trial gives you Pro plan features with limits of 1000 executions and the same computing power as the [Starter plan](https://n8n.io/pricing/).

## Upgrade to a paid account [\#](https://docs.n8n.io/manage-cloud/cloud-free-trial/\#upgrade-to-a-paid-account "Permanent link")

You can upgrade to a paid n8n account at any time. To upgrade:

1. Log in to your account.
2. Click the **Upgrade** button in the upper-right corner.
3. Select your plan and whether to pay annually or by the month.
4. Select a payment method.

## Trial expiration [\#](https://docs.n8n.io/manage-cloud/cloud-free-trial/\#trial-expiration "Permanent link")

If you don't upgrade by the end of your trial, the trial will automatically expire and your workspace will be deleted.

Download your workflows

You can [download your workflows](https://docs.n8n.io/manage-cloud/download-workflows/) to reuse them later. You have 90 days to download your workflows after your free trial ends.

### Cancelling your trial [\#](https://docs.n8n.io/manage-cloud/cloud-free-trial/\#cancelling-your-trial "Permanent link")

You don't need to cancel your trial. Your trial will automatically expire at the end of the trial period and no charges will occur. All your data will be deleted soon after.

## Enterprise trial [\#](https://docs.n8n.io/manage-cloud/cloud-free-trial/\#enterprise-trial "Permanent link")

You can contact the sales team if you want to test the [Enterprise plan](https://n8n.io/pricing/), which includes features such as:

- SSO SAML and LDAP
- Different environments
- External secret store integration
- Log streaming
- Version control using Git

Click the **Contact** button on the [n8n website](https://n8n.io/pricing/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>KoboToolbox node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/#kobotoolbox-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox.md "Edit this page")

# KoboToolbox node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#kobotoolbox-node "Permanent link")

Use the KoboToolbox node to automate work in KoboToolbox, and integrate KoboToolbox with other applications. n8n has built-in support for a wide range of KoboToolbox features, including creating, updating, deleting, and getting files, forms, hooks, and submissions.

On this page, you'll find a list of operations the KoboToolbox node supports and links to more resources.

Credentials

Refer to [KoboToolbox credentials](https://docs.n8n.io/integrations/builtin/credentials/kobotoolbox/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#operations "Permanent link")

- File
  - Create
  - Delete
  - Get
  - Get Many
- Form
  - Get
  - Get Many
    - Redeploy
- Hook
  - Get
  - Get Many
  - Logs
  - Retry All
  - Retry One
- Submission
  - Delete
  - Get
  - Get Many
  - Get Validation Status
  - Update Validation Status

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#templates-and-examples "Permanent link")

[Browse KoboToolbox integration templates](https://n8n.io/integrations/kobotoolbox/), or [search all templates](https://n8n.io/workflows/)

## Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#options "Permanent link")

### Query Options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#query-options "Permanent link")

The Query Submission operation supports query options:

- In the main section of the **Parameters** panel:
  - **Start** controls the index offset to start the query from (to use the API pagination logic).
  - **Limit** sets the maximum number of records to return. Note that the API always has a limit of 30,000 returned records, whatever value you provide.
- In the **Query Options** section, you can activate the following parameters:
  - **Query** lets you specify filter predicates in MongoDB's JSON query format. For example: `{"status": "success", "_submission_time": {"$lt": "2021-11-01T01:02:03"}}` queries for all submissions with the value `success` for the field `status`, and submitted before November 1st, 2021, 01:02:03.
  - **Fields** lets you specify the list of fields you want to fetch, to make the response lighter.
  - **Sort** lets you provide a list of sorting criteria in MongoDB JSON format. For example, `{"status": 1, "_submission_time": -1}` specifies a sort order by ascending status, and then descending submission time.

More details about these options can be found in the [Formhub API docs](https://github.com/SEL-Columbia/formhub/wiki/Formhub-Access-Points-(API)#api-parameters)

### Submission options [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#submission-options "Permanent link")

All operations that return form submission data offer options to tweak the response. These include:

- Download options lets you download any attachment linked to each particular form submissions, such as pictures and videos. It also lets you select the naming pattern, and the file size to download (if available - typically for images).
- Formatting options perform some reformatting as described in [About reformatting](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/#about-reformatting).

#### About reformatting [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#about-reformatting "Permanent link")

The default JSON format for KoboToolbox submission data is sometimes hard to deal with, because it's not schema-aware, and all fields are therefore returned as strings.

This node provides a lightweight opinionated reformatting logic, enabled with the **Reformat?** parameter, available on all operations that return form submissions: the submission query, get, and the attachment download operations.

When enabled, the reformatting:

- Reorganizes the JSON into a multi-level hierarchy following the form's groups. By default, question grouping hierarchy is materialized by a `/` character in the field names, for example `Group1/Question1`. With reformatting enabled, n8n reorganizes these into `Group1.Question1`, as nested JSON objects.
- Renames fields to trim `_` (not supported by many downstream systems).
- Parses all geospatial fields (Point, Line, and Area question types) into their standard GeoJSON equivalent.
- Splits all fields matching any of the **Multiselect Mask** wildcard masks into an array. Since the multi-select fields appear as space-separated strings, they can't be guessed algorithmically, so you must provide a field naming mask. Format the masks as a comma-separated list. Lists support the `*` wildcard.
- Converts all fields matching any of the **Number Mask** wildcard masks into a JSON float.

Here's a detailed example in JSON:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>``` | ```<br>{<br>  "_id": 471987,<br>  "formhub/uuid": "189436bb09a54957bfcc798e338b54d6",<br>  "start": "2021-12-05T16:13:38.527+02:00",<br>  "end": "2021-12-05T16:15:33.407+02:00",<br>  "Field_Details/Field_Name": "Test Fields",<br>  "Field_Details/Field_Location": "-1.932914 30.078211 1421 165",<br>  "Field_Details/Field_Shape": "-1.932914 30.078211 1421 165;-1.933011 30.078085 0 0;-1.933257 30.078004 0 0;-1.933338 30.078197 0 0;-1.933107 30.078299 0 0;-1.932914 30.078211 1421 165",<br>  "Field_Details/Crops_Grown": "maize beans avocado",<br>  "Field_Details/Field_Size_sqm": "2300",<br>  "__version__": "veGcULpqP6JNFKRJbbMvMs",<br>  "meta/instanceID": "uuid:2356cbbe-c1fd-414d-85c8-84f33e92618a",<br>  "_xform_id_string": "ajXVJpBkTD5tB4Nu9QXpgm",<br>  "_uuid": "2356cbbe-c1fd-414d-85c8-84f33e92618a",<br>  "_attachments": [],<br>  "_status": "submitted_via_web",<br>  "_geolocation": [<br>    -1.932914,<br>    30.078211<br>  ],<br>  "_submission_time": "2021-12-05T14:15:44",<br>  "_tags": [],<br>  "_notes": [],<br>  "_validation_status": {},<br>  "_submitted_by": null<br>}<br>``` |

With reformatting enabled, and the appropriate masks for multi-select and number formatting (for example, `Crops_*` and `*_sqm` respectively), n8n parses it into:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>43<br>44<br>45<br>46<br>47<br>48<br>49<br>50<br>51<br>52<br>53<br>54<br>55<br>56<br>57<br>58<br>59<br>60<br>61<br>62<br>63<br>64<br>65<br>66<br>67<br>``` | ```<br>{<br>  "id": 471987,<br>  "formhub": {<br>    "uuid": "189436bb09a54957bfcc798e338b54d6"<br>  },<br>  "start": "2021-12-05T16:13:38.527+02:00",<br>  "end": "2021-12-05T16:15:33.407+02:00",<br>  "Field_Details": {<br>    "Field_Name": "Test Fields",<br>    "Field_Location": {<br>      "lat": -1.932914,<br>      "lon": 30.078211<br>    },<br>    "Field_Shape": {<br>      "type": "polygon",<br>      "coordinates": [<br>        {<br>          "lat": -1.932914,<br>          "lon": 30.078211<br>        },<br>        {<br>          "lat": -1.933011,<br>          "lon": 30.078085<br>        },<br>        {<br>          "lat": -1.933257,<br>          "lon": 30.078004<br>        },<br>        {<br>          "lat": -1.933338,<br>          "lon": 30.078197<br>        },<br>        {<br>          "lat": -1.933107,<br>          "lon": 30.078299<br>        },<br>        {<br>          "lat": -1.932914,<br>          "lon": 30.078211<br>        }<br>      ]<br>    },<br>    "Crops_Grown": [<br>      "maize",<br>      "beans",<br>      "avocado"<br>    ],<br>    "Field_Size_sqm": 2300<br>  },<br>  "version": "veGcULpqP6JNFKRJbbMvMs",<br>  "meta": {<br>    "instanceID": "uuid:2356cbbe-c1fd-414d-85c8-84f33e92618a"<br>  },<br>  "xform_id_string": "ajXVJpBkTD5tB4Nu9QXpgm",<br>  "uuid": "2356cbbe-c1fd-414d-85c8-84f33e92618a",<br>  "attachments": [],<br>  "status": "submitted_via_web",<br>  "geolocation": {<br>    "lat": -1.932914,<br>    "lon": 30.078211<br>  },<br>  "submission_time": "2021-12-05T14:15:44",<br>  "tags": [],<br>  "notes": [],<br>  "validation_status": {},<br>  "submitted_by": null<br>}<br>``` |

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.kobotoolbox/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Xero node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/#xero-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.xero.md "Edit this page")

# Xero node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/\#xero-node "Permanent link")

Use the Xero node to automate work in Xero, and integrate Xero with other applications. n8n has built-in support for a wide range of Xero features, including creating, updating, and getting contacts and invoices.

On this page, you'll find a list of operations the Xero node supports and links to more resources.

Credentials

Refer to [Xero credentials](https://docs.n8n.io/integrations/builtin/credentials/xero/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/\#operations "Permanent link")

- Contact
  - Create a contact
  - Get a contact
  - Get all contacts
  - Update a contact
- Invoice
  - Create a invoice
  - Get a invoice
  - Get all invoices
  - Update a invoice

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/\#templates-and-examples "Permanent link")

**Get invoices from Xero**

by amudhan

[View template details](https://n8n.io/workflows/543-get-invoices-from-xero/)

**Integrate Xero with FileMaker using Webhooks**

by Stathis Askaridis

[View template details](https://n8n.io/workflows/2499-integrate-xero-with-filemaker-using-webhooks/)

**Send Personalized HTML Welcome Emails to New Xero Contacts via SMTP**

by Elegant Biztech

[View template details](https://n8n.io/workflows/7587-send-personalized-html-welcome-emails-to-new-xero-contacts-via-smtp/)

[Browse Xero integration templates](https://n8n.io/integrations/xero/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/\#related-resources "Permanent link")

Refer to [Xero's API documentation](https://developer.xero.com/documentation/api/accounting/overview) for more information about the service.

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.xero/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Mattermost credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/mattermost/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/mattermost/#mattermost-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/mattermost.md "Edit this page")

# Mattermost credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/mattermost/\#mattermost-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Mattermost](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.mattermost/)

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/mattermost/\#supported-authentication-methods "Permanent link")

- API access token

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/mattermost/\#related-resources "Permanent link")

Refer to [Mattermost's API documentation](https://api.mattermost.com/) for more information about the service.

## Using API access token [\#](https://docs.n8n.io/integrations/builtin/credentials/mattermost/\#using-api-access-token "Permanent link")

To configure this credential, you'll need a [Mattermost](https://www.mattermost.com/) account and:

- A personal **Access Token**
- Your Mattermost **Base URL**.

To set it up:

1. In Mattermost, go to **Profile > Security > Personal Access Tokens**.



No Personal Access Tokens option



If you don't see the Personal Access Tokens option, refer to the troubleshooting steps in [Enable personal access tokens](https://docs.n8n.io/integrations/builtin/credentials/mattermost/#enable-personal-access-tokens) below.

2. Select **Create Token**.

3. Enter a **Token description**, like `n8n integration`.
4. Select **Save**.
5. Copy the **Token ID** and enter it as the **Access Token** in your n8n credential.
6. Enter your Mattermost URL as the **Base URL**.
7. By default, n8n connects only if SSL certificate validation succeeds. To connect even if SSL certificate validation fails, turn on **Ignore SSL Issues**.

Refer to the Mattermost [Personal access tokens documentation](https://developers.mattermost.com/integrate/reference/personal-access-token/) for more information.

## Enable personal access tokens [\#](https://docs.n8n.io/integrations/builtin/credentials/mattermost/\#enable-personal-access-tokens "Permanent link")

Not seeing the **Personal Access Tokens** option has two possible causes:

- Mattermost doesn't have the personal access tokens integration enabled.
- You're trying to generate a personal access token as a non-admin user who doesn't have permission to generate personal access tokens.

To identify the root cause and resolve it:

1. Log in to Mattermost as an admin.
2. Go to **System Console > Integrations > Integration Management**.
3. Confirm that **Enable personal access tokens** is set to **true**. If it's not, change.
4. Go to **System Console > User Management > Users**.
5. Search for the user account you want to allow to generate personal access tokens.
6. Select the **Actions** dropdown for the user and select **Manage roles**.
7. Check the box for **Allow this account to generate personal access tokens** and **Save**.

Refer to the Mattermost [Personal access tokens documentation](https://developers.mattermost.com/integrate/reference/personal-access-token/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Azure Storage node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/#azure-storage-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage.md "Edit this page")

# Azure Storage node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/\#azure-storage-node "Permanent link")

The Azure Storage node has built-in support for a wide range of features, which includes creating, getting, and deleting blobs and containers. Use this node to automate work within the Azure Storage service or integrate it with other services in your workflow.

On this page, you'll find a list of operations the Azure Storage node supports, and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/azurestorage/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/\#operations "Permanent link")

- **Blob**
  - **Create blob**: Create a new blob or replace an existing one.
  - **Delete blob**: Delete an existing blob.
  - **Get blob**: Retrieve data for a specific blob.
  - **Get many blobs**: Retrieve a list of blobs.
- **Container**
  - **Create container**: Create a new container.
  - **Delete container**: Delete an existing container.
  - **Get container**: Retrieve data for a specific container.
  - **Get many containers**: Retrieve a list of containers.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/\#templates-and-examples "Permanent link")

[Browse Azure Storage integration templates](https://n8n.io/integrations/azure-storage/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/\#related-resources "Permanent link")

Refer to [Microsoft's Azure Storage documentation](https://learn.microsoft.com/en-us/rest/api/storageservices/) for more information about the service.

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.azurestorage/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Strapi credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/strapi/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/strapi/#strapi-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/strapi.md "Edit this page")

# Strapi credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#strapi-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Strapi](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.strapi/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#prerequisites "Permanent link")

Create a [Strapi](https://strapi.io/) admin account with:

- Access to an existing Strapi project.
- At least one collection type within that project.
- Published data within that collection type.

Refer to the Strapi developer [Quick Start Guide](https://docs.strapi.io/dev-docs/quick-start) for more information.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#supported-authentication-methods "Permanent link")

- API user account: Requires a user account with appropriate content permissions.
- API token: Requires an admin account.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#related-resources "Permanent link")

Refer to [Strapi's documentation](https://docs.strapi.io/dev-docs/api/rest) for more information about the service.

## Using API user account [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#using-api-user-account "Permanent link")

To configure this credential, you'll need:

- A user **Email**: Must be for a user account, not an admin account. Refer to the more detailed instructions below.
- A user **Password**: Must be for a user account, not an admin account. Refer to the more detailed instructions below.
- The **URL**: Use the public URL of your Strapi server, defined in `./config/server.js` as the `url` parameter. Strapi recommends using an absolute URL.
  - For Strapi Cloud projects, use the URL of your Cloud project, for example: `https://my-strapi-project-name.strapiapp.com`
- The **API Version**: Select the version of the API you want your calls to use. Options include:
  - **Version 3**
  - **Version 4**

In Strapi, the configuration involves two steps:

1. [Configure a role](https://docs.n8n.io/integrations/builtin/credentials/strapi/#configure-a-role).
2. [Create a user account](https://docs.n8n.io/integrations/builtin/credentials/strapi/#create-a-user-account).

Refer to the more detailed instructions below for each step.

### Configure a role [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#configure-a-role "Permanent link")

For API access, use the Users & Permissions Plugin in **Settings > Users & Permissions Plugin**.

Refer to [Configuring Users & Permissions Plugin](https://docs.strapi.io/user-docs/settings/configuring-users-permissions-plugin-settings) for more information on the plugin. Refer to [Configuring end-user roles](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles) for more information on roles.

For the n8n credential, the user must have a role that grants them API permissions on the collection type. For the role, you can either:

- Update the default **Authenticated** role to include the permissions and assign the user to that role. Refer to [Configuring role's permissions](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles#configuring-roles-permissions) for more information.
- Create a new role to include the permissions and assign the user to that role. Refer to [Creating a new role](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-end-users-roles#creating-a-new-role) for more information.

For either option, once you open the role:

1. Go to the **Permissions** section.
2. Open the section for the relevant collection type.
3. Select the permissions for the collection type that the role should have. Options include:
   - `create` (POST)
   - `find` and `findone` (GET)
   - `update` (PUT)
   - `delete` (DELETE)
4. Repeat for all relevant collection types.
5. Save the role.

Refer to [Endpoints](https://docs.strapi.io/dev-docs/api/rest#endpoints) for more information on the permission options.

### Create a user account [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#create-a-user-account "Permanent link")

Now that you have an appropriate role, create an end-user account and assign the role to it:

1. Go to **Content Manager > Collection Types > User**.
2. Select **Add new entry**.
3. Fill in the user details. The n8n credential requires these fields, though your Strapi project may have more custom required fields:
   - **Username**: Required for all Strapi users.
   - **Email**: Enter in Strapi and use as the **Email** in the n8n credential.
   - **Password**: Enter in Strapi and use as the **Password** in the n8n credential.
   - **Role**: Select the role you set up in the previous step.

Refer to [Managing end-user accounts](https://docs.strapi.io/user-docs/users-roles-permissions/managing-end-users) for more information.

## Using API token [\#](https://docs.n8n.io/integrations/builtin/credentials/strapi/\#using-api-token "Permanent link")

To configure this credential, you'll need:

- An **API Token**: Create an API token from **Settings > Global Settings > API Tokens**. Refer to Strapi's [Creating a new API token documentation](https://docs.strapi.io/user-docs/settings/API-tokens#creating-a-new-api-token) for more details and information on regenerating API tokens.



API tokens permission



If you don't see the **API tokens** option in **Global settings**, your account doesn't have the **API tokens > Read** permission.

- The **URL**: Use the public URL of your Strapi server, defined in `./config/server.js` as the `url` parameter. Strapi recommends using an absolute URL.
  - For Strapi Cloud projects, use the URL of your Cloud project, for example: `https://my-strapi-project-name.strapiapp.com`
- The **API Version**: Select the version of the API you want your calls to use. Options include:
  - **Version 3**
  - **Version 4**

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Gmail | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/#gmail-imap-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/imap/gmail.md "Edit this page")

# Gmail IMAP credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/\#gmail-imap-credentials "Permanent link")

Follow these steps to configure the IMAP credentials with a Gmail account.

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/\#prerequisites "Permanent link")

To follow these instructions, you must first:

1. [Enable 2-step Verification](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/#enable-2-step-verification) on your Gmail account.
2. [Generate an app password](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/#generate-an-app-password).

### Enable 2-step Verification [\#](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/\#enable-2-step-verification "Permanent link")

To enable 2-step Verification:

1. Log in to your [Google Account](https://myaccount.google.com/).
2. Select **Security** from the left navigation.
3. Under **How you sign in to Google**, select **2-Step Verification**.
   - If 2-Step Verification is already enabled, skip to the next section.
4. Select **Get started**.
5. Follow the on-screen steps to configure 2-Step Verification.

Refer to [Turn on 2-step Verification](https://support.google.com/accounts/answer/185839) for more information.

If you can't turn on 2-step Verification, check with your email administrator.

### Generate an app password [\#](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/\#generate-an-app-password "Permanent link")

To generate an app password:

1. In your Google account, go to [App passwords](https://myaccount.google.com/apppasswords).
2. Enter an **App name** for your new app password, like `n8n credential`.
3. Select **Create**.
4. Copy the generated app password. You'll use this in your n8n credential.

Refer to Google's [Sign in with app passwords documentation](https://support.google.com/accounts/answer/185833?hl=en) for more information.

## Set up the credential [\#](https://docs.n8n.io/integrations/builtin/credentials/imap/gmail/\#set-up-the-credential "Permanent link")

To set up the IMAP credential with a Gmail account, use these settings:

1. Enter your Gmail email address as the **User**.
2. Enter the app password you generated above as the **Password**.
3. Enter `imap.gmail.com` as the **Host**.
4. For the **Port**, keep the default port number of `993`. Check with your email administrator if this port doesn't work.
5. Turn on the **SSL/TLS** toggle.
6. Check with your email administrator about whether to **Allow Self-Signed Certificates**.

Refer to [Add Gmail to another client](https://support.google.com/mail/answer/7126229?hl=en) for more information. You may need to **Enable IMAP** if you're using a personal Google account before June 2024.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Strava Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger/#strava-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger.md "Edit this page")

# Strava Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger/\#strava-trigger-node "Permanent link")

[Strava](https://www.strava.com/) is an internet service for tracking human exercise which incorporates social network features.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/strava/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Strava Trigger integrations](https://n8n.io/integrations/strava-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.stravatrigger/\#events "Permanent link")

- **\[All\]**
  - \[All\]
  - Created
  - Deleted
  - Updated
- **Activity**
  - \[All\]
  - Created
  - Deleted
  - Updated
- **Athlete**
  - \[All\]
  - Created
  - Deleted
  - Updated

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>ServiceNow credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/servicenow/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/servicenow/#servicenow-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/servicenow.md "Edit this page")

# ServiceNow credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/servicenow/\#servicenow-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [ServiceNow](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.servicenow/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/servicenow/\#prerequisites "Permanent link")

Create a [ServiceNow](https://developer.servicenow.com/dev.do#!/reference) developer account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/servicenow/\#supported-authentication-methods "Permanent link")

- Basic auth
- OAuth2

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/servicenow/\#related-resources "Permanent link")

Refer to [ServiceNow's API documentation](https://developer.servicenow.com/dev.do#!/reference/api/washingtondc/rest/) for more information about the service.

## Using basic auth [\#](https://docs.n8n.io/integrations/builtin/credentials/servicenow/\#using-basic-auth "Permanent link")

To configure this credential, you'll need:

- A **User** name: Enter your ServiceNow username.
- A **Password**: Enter your ServiceNow password.
- A **Subdomain**: The subdomain for your servicenow instance is in your instance URL: `https://<subdomain>.service-now.com/`. For example, if the full URL is `https://dev99890.service-now.com`, then the subdomain is `dev99890`.

## Using OAuth2 [\#](https://docs.n8n.io/integrations/builtin/credentials/servicenow/\#using-oauth2 "Permanent link")

To configure this credential, you'll need:

- A **Client ID**: Generated once you register a new app.
- A **Client Secret**: Generated once you register a new app.
- A **Subdomain**: The subdomain for your servicenow instance is in your instance URL: `https://<subdomain>.service-now.com/`. For example, if the full URL is `https://dev99890.service-now.com`, then the subdomain is `dev99890`.

To generate your **Client ID** and **Client Secret**, register a new app in **System OAuth > Application Registry > New > Create an OAuth API endpoint for external clients**. Use these settings for your app:

- Copy the **Client ID** and add it to your n8n credential.
- Enter a **Client Secret** or leave it blank to automatically generate a random secret. Add this secret to your n8n credential.
- Copy the n8n **OAuth Redirect URL** and add it as a **Redirect URL**.

Refer to [How to setup OAuth2 authentication for RESTMessageV2 integrations](https://www.servicenow.com/community/in-other-news/how-to-setup-oauth2-authentication-for-restmessagev2/ba-p/2271823) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>CrateDB credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/cratedb/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/cratedb/#cratedb-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/cratedb.md "Edit this page")

# CrateDB credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/cratedb/\#cratedb-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [CrateDB](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.cratedb/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/cratedb/\#prerequisites "Permanent link")

An available instance of CrateDB.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/cratedb/\#supported-authentication-methods "Permanent link")

- account connection

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/cratedb/\#related-resources "Permanent link")

Refer to [CrateDB's documentation](https://cratedb.com/docs/crate/reference/en/latest/) for more information about the service.

## Using account connection [\#](https://docs.n8n.io/integrations/builtin/credentials/cratedb/\#using-account-connection "Permanent link")

To configure this credential, you'll need:

- Your **Host** name
- Your **Database** name
- A **User** name
- A user **Password**
- To set the **SSL** parameter. Refer to the [CrateDB Secured Communications (SSL/TLS) documentation](https://cratedb.com/docs/crate/reference/en/5.7/admin/ssl.html#admin-ssl) for more information. The options n8n supports are:
  - Allow
  - Disable
  - Require
- A **Port** number

Refer to the [Connect to a CrateDB cluster documentation](https://cratedb.com/docs/crate/clients-tools/en/latest/connect/) for detailed instructions on these fields and their default values.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Zammad credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/zammad/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/zammad/#zammad-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/zammad.md "Edit this page")

# Zammad credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/zammad/\#zammad-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Zammad](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.zammad/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/zammad/\#prerequisites "Permanent link")

- Create a hosted [Zammad](https://zammad.com/) account or set up your own Zammad instance.
- For token authentication, enable **API Token Access** in **Settings > System > API**. Refer to [Setting up a Zammad](https://admin-docs.zammad.org/en/latest/system/integrations/zabbix.html?#setting-up-a-zammad) for more information.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/zammad/\#supported-authentication-methods "Permanent link")

- Basic auth
- Token auth: Zammad recommends using this authentication method.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/zammad/\#related-resources "Permanent link")

Refer to [Zammad's API Authentication documentation](https://docs.zammad.org/en/latest/api/intro.html?#authentication) for more information about authenticating with the service.

## Using basic auth [\#](https://docs.n8n.io/integrations/builtin/credentials/zammad/\#using-basic-auth "Permanent link")

To configure this credential, you'll need:

- A **Base URL**: Enter the URL of your Zammad instance.
- An **Email** address: Enter the email address you use to log in to Zammad.
- A **Password**: Enter your Zammad password.
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

## Using token auth [\#](https://docs.n8n.io/integrations/builtin/credentials/zammad/\#using-token-auth "Permanent link")

To configure this credential, you'll need:

- A **Base URL**: Enter the URL of your Zammad instance.
- An **Access Token**: Once **API Token Access** is enabled for the Zammad instance, any user with the `user_preferences.access_token` permission can generate an **Access Token** by going to your **avatar > Profile > Token Access** and **Create** a new token.
  - The access token permissions depend on what actions you'd like to complete with this credential. For all functionality within the [Zammad](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.zammad/) node, select:
    - `admin.group`
    - `admin.organization`
    - `admin.user`
    - `ticket.agent`
    - `ticket.customer`
- **Ignore SSL Issues**: When turned on, n8n will connect even if SSL certificate validation fails.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Asana Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/#asana-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger.md "Edit this page")

# Asana Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/\#asana-trigger-node "Permanent link")

[Asana](https://asana.com/) is a web and mobile application designed to help teams organize, track, and manage their work.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/asana/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Asana Trigger integrations](https://n8n.io/integrations/asana-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/\#events "Permanent link")

- New Asana event

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.asanatrigger/\#related-resources "Permanent link")

n8n provides an app node for Asana. You can find the node docs [here](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.asana/).

View [example workflows and related content](https://n8n.io/integrations/asana-trigger/) on n8n's website.

Refer to [Asana's documentation](https://developers.asana.com/reference/rest-api-reference) for details about their API.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Medium node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.medium/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.medium/#medium-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.medium.md "Edit this page")

# Medium node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.medium/\#medium-node "Permanent link")

Use the Medium node to automate work in Medium, and integrate Medium with other applications. n8n has built-in support for a wide range of Medium features, including creating posts, and getting publications.

On this page, you'll find a list of operations the Medium node supports and links to more resources.

Medium API no longer supported

Medium has stopped supporting the Medium API. The Medium node still appears within n8n, but you won't be able to configure new API keys to authenticate with.

Refer to [Medium credentials](https://docs.n8n.io/integrations/builtin/credentials/medium/) for guidance on setting up existing API keys.

This node can be used as an AI tool

This node can be used to enhance the capabilities of an AI agent. When used in this way, many parameters can be set automatically, or with information directed by AI - find out more in the [AI tool parameters documentation](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.medium/\#operations "Permanent link")

- Post
  - Create a post
- Publication
  - Get all publications

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.medium/\#templates-and-examples "Permanent link")

**Cross-post your blog posts**

by amudhan

[View template details](https://n8n.io/workflows/418-cross-post-your-blog-posts/)

**Posting from Wordpress to Medium**

by Zacharia Kimotho

[View template details](https://n8n.io/workflows/2062-posting-from-wordpress-to-medium/)

**Publish a post to a publication on Medium**

by Harshil Agrawal

[View template details](https://n8n.io/workflows/594-publish-a-post-to-a-publication-on-medium/)

[Browse Medium integration templates](https://n8n.io/integrations/medium/), or [search all templates](https://n8n.io/workflows/)

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.medium/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Sharing | n8n Docs  </title>
  <url>https://docs.n8n.io/workflows/sharing/</url>
  <content>
[Skip to content](https://docs.n8n.io/workflows/sharing/#workflow-sharing)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/workflows/sharing.md "Edit this page")

# Workflow sharing [\#](https://docs.n8n.io/workflows/sharing/\#workflow-sharing "Permanent link")

Feature availability

Available on Pro and Enterprise Cloud plans, and Enterprise self-hosted plans.

Workflow sharing allows you to share workflows between users of the same n8n instance.

Users can share workflows they created. Instance owners, and users with the admin role, can view and share all workflows in the instance. Refer to [Account types](https://docs.n8n.io/user-management/account-types/) for more information about owners and admins.

## Share a workflow [\#](https://docs.n8n.io/workflows/sharing/\#share-a-workflow "Permanent link")

1. Open the workflow you want to share.
2. Select **Share**.
3. In **Add users**, find and select the users you want to share with.
4. Select **Save**.

## View shared workflows [\#](https://docs.n8n.io/workflows/sharing/\#view-shared-workflows "Permanent link")

You can browse and search workflows on the **Workflows** list. The workflows in the list depend on the project:

- **Overview** lists all workflows you can access. This includes:
  - Your own workflows.
  - Workflows shared with you.
  - Workflows in projects you're a member of.
  - If you log in as the instance owner or admin: all workflows in the instance.
- Other projects: all workflows in the project.

## Workflow roles and permissions [\#](https://docs.n8n.io/workflows/sharing/\#workflow-roles-and-permissions "Permanent link")

There are two workflow roles: creator and editor. The creator is the user who created the workflow. Editors are other users with access to the workflow.

You can't change the workflow owner, except when deleting the user.

Credentials

Workflow sharing allows editors to use all [credentials](https://docs.n8n.io/glossary/#credential-n8n) used in the workflow. This includes credentials that aren't explicitly shared with them using [credential sharing](https://docs.n8n.io/credentials/credential-sharing/).

### Permissions [\#](https://docs.n8n.io/workflows/sharing/\#permissions "Permanent link")

| Permissions | Creator | Editor |
| --- | --- | --- |
| View workflow (read-only) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) |
| View executions | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) |
| Update (including tags) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) |
| Run | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) |
| Share | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![❌](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/274c.svg) |
| Export | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) |
| Delete | ![✅](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/2705.svg) | ![❌](https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/274c.svg) |

## Node editing restrictions with unshared credentials [\#](https://docs.n8n.io/workflows/sharing/\#node-editing-restrictions-with-unshared-credentials "Permanent link")

Sharing in n8n works on the principle of least privilege. This means that if a user shares a workflow with you, but they don't share their credentials, you can't edit the nodes within the workflow that use those credentials. You can view and run the workflow, and edit nodes that don't use unshared credentials.

Refer to [Credential sharing](https://docs.n8n.io/credentials/credential-sharing/) for guidance on sharing credentials.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Examples using n8n's HTTP Request node | n8n Docs  </title>
  <url>https://docs.n8n.io/code/cookbook/http-node/</url>
  <content>
[Skip to content](https://docs.n8n.io/code/cookbook/http-node/#examples-using-n8ns-http-request-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/code/cookbook/http-node/index.md "Edit this page")

# Examples using n8n's HTTP Request node [\#](https://docs.n8n.io/code/cookbook/http-node/\#examples-using-n8ns-http-request-node "Permanent link")

The HTTP Request node is one of the most versatile nodes in n8n. Use this node to make HTTP requests to query data from any app or service with a REST API.

Refer to [HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) for information on node settings.

- [Pagination](https://docs.n8n.io/code/cookbook/http-node/pagination/)

## Related resources [\#](https://docs.n8n.io/code/cookbook/http-node/\#related-resources "Permanent link")

- [HTTP Request](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/)
- [Built-in methods and variables reference](https://docs.n8n.io/code/builtin/overview/)
- [Expressions](https://docs.n8n.io/code/expressions/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>RabbitMQ Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqtrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqtrigger/#rabbitmq-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqtrigger.md "Edit this page")

# RabbitMQ Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqtrigger/\#rabbitmq-trigger-node "Permanent link")

[RabbitMQ](https://www.rabbitmq.com/) is an open-source message broker that accepts and forwards messages.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/rabbitmq/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Rabbit MQ Trigger integrations](https://n8n.io/integrations/rabbitmq-trigger/) page.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.rabbitmqtrigger/\#related-resources "Permanent link")

n8n provides an app node for RabbitMQ. You can find the node docs [here](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.rabbitmq/).

View [example workflows and related content](https://n8n.io/integrations/rabbitmq-trigger/) on n8n's website.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Webflow node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.webflow/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.webflow/#webflow-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.webflow.md "Edit this page")

# Webflow node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.webflow/\#webflow-node "Permanent link")

Use the Webflow node to automate work in Webflow, and integrate Webflow with other applications. n8n has built-in support for a wide range of Webflow features, including creating, updating, deleting, and getting items.

On this page, you'll find a list of operations the Webflow node supports and links to more resources.

Credentials

Refer to [Webflow credentials](https://docs.n8n.io/integrations/builtin/credentials/webflow/) for guidance on setting up authentication.

This node can be used as an AI tool

This node can be used to enhance the capabilities of an AI agent. When used in this way, many parameters can be set automatically, or with information directed by AI - find out more in the [AI tool parameters documentation](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.webflow/\#operations "Permanent link")

- Item
  - Create
  - Delete
  - Get
  - Get All
  - Update

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.webflow/\#templates-and-examples "Permanent link")

**Enrich FAQ sections on your website pages at scale with AI**

by Polina Medvedieva

[View template details](https://n8n.io/workflows/2434-enrich-faq-sections-on-your-website-pages-at-scale-with-ai/)

**Sync blog posts from Notion to Webflow**

by Giovanni Ruggieri

[View template details](https://n8n.io/workflows/2293-sync-blog-posts-from-notion-to-webflow/)

**Real-time lead routing in Webflow**

by Lucas Perret

[View template details](https://n8n.io/workflows/2033-real-time-lead-routing-in-webflow/)

[Browse Webflow integration templates](https://n8n.io/integrations/webflow/), or [search all templates](https://n8n.io/workflows/)

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.webflow/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Performance and benchmarking | n8n Docs  </title>
  <url>https://docs.n8n.io/hosting/scaling/performance-benchmarking/</url>
  <content>
[Skip to content](https://docs.n8n.io/hosting/scaling/performance-benchmarking/#performance-and-benchmarking)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/hosting/scaling/performance-benchmarking.md "Edit this page")

# Performance and benchmarking [\#](https://docs.n8n.io/hosting/scaling/performance-benchmarking/\#performance-and-benchmarking "Permanent link")

n8n can handle up to 220 workflow executions per second on a single instance, with the ability to scale up further by adding more instances.

This document outlines n8n's performance benchmarking. It describes the factors that affect performance, and includes two example benchmarks.

## Performance factors [\#](https://docs.n8n.io/hosting/scaling/performance-benchmarking/\#performance-factors "Permanent link")

The performance of n8n depends on factors including:

- The workflow type
- The resources available to n8n
- How you configure n8n's scaling options

## Run your own benchmarking [\#](https://docs.n8n.io/hosting/scaling/performance-benchmarking/\#run-your-own-benchmarking "Permanent link")

To get an accurate estimate for your use case, run n8n's [benchmarking framework](https://github.com/n8n-io/n8n/tree/master/packages/%40n8n/benchmark). The repository contains more information about the benchmarking.

## Example: Single instance performance [\#](https://docs.n8n.io/hosting/scaling/performance-benchmarking/\#example-single-instance-performance "Permanent link")

This test measures how response time increases as requests per second increase. It looks at the response time when calling the Webhook Trigger node.

Setup:

- Hardware: ECS c5a.large instance (4GB RAM)
- n8n setup: Single n8n instance (running in main mode, with Postgres database)
- Workflow: Webhook Trigger node, Edit Fields node

[![Graph showing n8n response times by requests per second](https://docs.n8n.io/_images/hosting/scaling/benchmarking-single-instance-100-250.png)](https://docs.n8n.io/_images/hosting/scaling/benchmarking-single-instance-100-250.png)

This graph shows the percentage of requests to the Webhook Trigger node getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.

## Example: Multi-instance performance [\#](https://docs.n8n.io/hosting/scaling/performance-benchmarking/\#example-multi-instance-performance "Permanent link")

This test measures how response time increases as requests per second increase. It looks at the response time when calling the Webhook Trigger node.

Setup:

- Hardware: seven ECS c5a.4xlarge instances (8GB RAM each)
- n8n setup: two webhook instances, four worker instances, one database instance (MySQL), one main instance running n8n and Redis
- Workflow: Webhook Trigger node, Edit Fields node
- Multi-instance setups use [Queue mode](https://docs.n8n.io/hosting/scaling/queue-mode/)

[![Graph showing n8n response times by requests per second](https://docs.n8n.io/_images/hosting/scaling/benchmarking-multi-instance-500-2500.png)](https://docs.n8n.io/_images/hosting/scaling/benchmarking-multi-instance-500-2500.png)

This graph shows the percentage of requests to the Webhook Trigger node getting a response within 100 seconds, and how that varies with load. Under higher loads n8n usually still processes the data, but takes over 100s to respond.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Supabase node common issues | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/#supabase-node-common-issues)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues.md "Edit this page")

# Supabase node common issues [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/\#supabase-node-common-issues "Permanent link")

Here are some common errors and issues with the [Supabase node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/) and steps to resolve or troubleshoot them.

## Filtering rows by metadata [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/\#filtering-rows-by-metadata "Permanent link")

To filter rows by [Supabase metadata](https://supabase.com/docs/guides/ai/python/metadata), set the **Select Type** to **String**.

From there, you can construct a query in the **Filters (String)** parameter to filter the metadata using the [Supabase metadata query language](https://supabase.com/docs/guides/ai/python/metadata#metadata-query-language), inspired by the [MongoDB selectors](https://www.mongodb.com/docs/manual/reference/operator/query/) format. Access the metadata properties using the [Postgres `->>` arrow JSON operator](https://www.postgresql.org/docs/current/functions-json.html#FUNCTIONS-JSON-PROCESSING) like this (curly brackets denote components to fill in):

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>metadata->>{your-property}={comparison-operator}.{comparison-value}<br>``` |

For example to access an `age` property in the metadata and return results greater than or equal to 21, you could enter the following in the **Filters (String)** field:

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>metadata->>age=gte.21<br>``` |

You can combine these operators to construct more complex queries.

## Can't connect to a local Supabase database when using Docker [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/\#cant-connect-to-a-local-supabase-database-when-using-docker "Permanent link")

When you run Supabase in Docker, you need to configure the network so that n8n can connect to Supabase.

The solution depends on how you're hosting the two components.

### If only Supabase is in Docker [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/\#if-only-supabase-is-in-docker "Permanent link")

If only Supabase is running in Docker, the Docker Compose file used by the [self-hosting guide](https://supabase.com/docs/guides/self-hosting/docker) already runs Supabase bound to the correct interfaces.

When configuring [Supabase credentials](https://docs.n8n.io/integrations/builtin/credentials/supabase/), the `localhost` address should work without a problem (set the **Host** to `localhost`).

### If Supabase and n8n are running in separate Docker containers [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/\#if-supabase-and-n8n-are-running-in-separate-docker-containers "Permanent link")

If both n8n and Supabase are running in Docker in separate containers, you can use Docker networking to connect them.

Configure Supabase to listen on all interfaces by binding to `0.0.0.0` inside of the container (the official [Docker compose configuration](https://supabase.com/docs/guides/self-hosting/docker) already does this this). Add both the Supabase and n8n components to the same [user-defined bridge network](https://docs.docker.com/engine/network/drivers/bridge/) if you aren't already managing them together in the same Docker Compose file.

When configuring [Supabase credentials](https://docs.n8n.io/integrations/builtin/credentials/supabase/), use the Supabase API gateway container's name ( `supabase-kong` by default) as the host address instead of `localhost`. For example, if you use the default configuration, you would set the **Host** to `http://supabase-kong:8000`.

## Records are accessible through Postgres but not Supabase [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.supabase/common-issues/\#records-are-accessible-through-postgres-but-not-supabase "Permanent link")

If queries for records return empty using the Supabase node, but are available through the [Postgres](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.postgres/) node or with a Postgres client, there may be a conflict with Supabase's [Row Level Security (RLS)](https://supabase.com/docs/guides/database/postgres/row-level-security) policy.

Supabase always enables RLS when you create a table in a public schema with the Table Editor. When RLS is active, the API doesn't return any data with the public `anon` key until you create policies. This is a security measure to ensure that you only expose data you intend to.

To access data from a table with RLS enabled as the `anon` role, [create a policy](https://supabase.com/docs/guides/database/postgres/row-level-security#creating-policies) to enable the access patterns you intend to use.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

×

This website uses cookies

We use cookies to personalise content, ads and to analyse our traffic. We also share information about your use of our site with our advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services. [Read more](https://n8n.io/legal/?eco_features=CAMPAIGN_PERSONALIZATION#privacy)

Strictly necessary

Performance

Targeting

Functionality

Save & Close

Accept all

Decline all

Show details
Hide details

Cookie declaration

About cookies

Strictly necessary

Performance

Targeting

Functionality

Strictly necessary cookies allow core website functionality such as user login and account management. The website cannot be used properly without strictly necessary cookies.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| \_\_sec\_\_token | n8n.io | 1 day |  |
| \_\_sec\_\_fid | n8n.io | 9 months 4 weeks |  |
| \_\_sec\_\_ghost | n8n.io | 9 months 4 weeks |  |
| \_\_sec\_tid | n8n.io | 9 months 4 weeks |  |
| rl\_session | .n8n.io | 1 year | This cookie is used for managing user session on the website. It typically maintains the user's state during the session, ensuring that users remain connected and their interactions with the site are coherent throughout their visit. This can include keeping users logged in, tracking their actions, or persisting settings during the session. |
| AWSALBTGCORS | [Amazon Web Services, Inc.](https://aws.amazon.com/privacy/)<br> airtable.com | 1 week | This cookie is used to support load balancing, ensuring that visitor page requests are routed to the same server in any browsing session. |
| \_tracking\_consent | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 1 year | Tracking preferences. |
| \_orig\_referrer | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 2 weeks | This cookie is generally provided by Shopify and is used in connection with a shopping cart. |
| \_\_Host-airtable-session.sig | [Airtable](https://airtable.com/privacy)<br> airtable.com | 1 year | This cookie is used to ensure secure user sessions and for authentication purposes. |
| \_GRECAPTCHA | [Google LLC](https://policies.google.com/privacy)<br> www.google.com | 5 months 3 weeks | Google reCAPTCHA sets a necessary cookie (\_GRECAPTCHA) when executed for the purpose of providing its risk analysis. |
| brwConsent | [Airtable](https://airtable.com/privacy)<br> .airtable.com | 4 minutes 59 seconds | This cookie is used to record the user's consent to the use of cookies on the website, ensuring compliance with the website's privacy policy by remembering the user's preferences and consent state regarding cookies. |
| localization | [Flickr Inc.](https://www.flickr.com/help/privacy)<br> merch.n8n.io | 1 year | These cookies are set on pages with the Flickr widget. |
| \_\_Host-airtable-session | [Airtable](https://airtable.com/privacy)<br> airtable.com | 1 year | This cookie is used to manage the user session in a secure way, ensuring the user's interaction with the website is seamless and secure while accessing Airtable integrations or content. |
| \_\_sec\_crid | n8n.io | 9 months 4 weeks |  |
| keep\_alive | merch.n8n.io | Session | This cookie is used to maintain an active user session on the website and ensure that the user's connection remains secure and uninterrupted during their browsing session. |
| \_\_sec\_\_cid | n8n.io | 1 day |  |
| \_\_cf\_logged\_in | [Cloudflare](https://www.cloudflare.com/privacypolicy/)<br> .cloudflare.com | 4 weeks 2 days | Part of our security firewall Cloudflare (e.g. identifying trusted users) |
| CF\_VERIFIED\_DEVICE\_XXXXX | [Cloudflare](https://www.cloudflare.com/privacypolicy/)<br> .cloudflare.com | 1 year | Cloudflare |
| sparrow\_id | [Cloudflare](https://www.cloudflare.com/privacypolicy/)<br> .cloudflare.com | 5 months 3 weeks | This cookie is used by Cloudflare to help optimise the performance and security of the website and access to it. They do not contain user credentials, IP anonymisation is used. |

Cookie report

Performance cookies are used to see how visitors use the website, eg. analytics cookies. Those cookies cannot be used to directly identify a certain visitor.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| ph\_phc\_XXXXX\_posthog | [Posthog](https://posthog.com/privacy)<br> .tapfiliate.com | 1 year | Posthog |
| \_gat\_UA-146470481-8 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 59 seconds | This is a pattern type cookie set by Google Analytics, where the pattern element on the name contains the unique identity number of the account or website it relates to. It is a variation of the \_gat cookie which is used to limit the amount of data recorded by Google on high traffic volume websites. |
| \_gid | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 day | This cookie is set by Google Analytics. It stores and update a unique value for each page visited and is used to count and track pageviews. |
| rl\_anonymous\_id | .n8n.io | 1 year | This cookie is used to identify anonymously a visitor. It is generally used for tracking and analytics purposes, helping website owners understand how visitors interact with the site. |
| \_ga | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie name is associated with Google Universal Analytics - which is a significant update to Google's more commonly used analytics service. This cookie is used to distinguish unique users by assigning a randomly generated number as a client identifier. It is included in each page request in a site and used to calculate visitor, session and campaign data for the sites analytics reports. |
| \_ga\_PGLF3YY0XT | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| rl\_page\_init\_referrer | .n8n.io | 1 year |  |
| \_ga\_Q7GL51X95F | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| \_gat\_UA-146470481-5 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 59 seconds | This is a pattern type cookie set by Google Analytics, where the pattern element on the name contains the unique identity number of the account or website it relates to. It is a variation of the \_gat cookie which is used to limit the amount of data recorded by Google on high traffic volume websites. |
| \_shopify\_y | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 1 year 6 hours | This cookie is associated with Shopify's analytics suite. <br>Provider address: <br>151 O'Connor Street, Ground floor, Ottawa, ON, K2P 2L8, Canada |
| \_ga\_1EB8LCPG5B | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| rl\_group\_id | .n8n.io | 1 year | This cookie is used to group users for analytical purposes to enhance user experience on the website. |
| \_ga\_0SC4FF2FH9 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 year 1 month | This cookie is used by Google Analytics to persist session state. |
| originalClientId | .n8n.io | 4 weeks 2 days |  |
| \_shopify\_s | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 30 minutes | This cookie is associated with Shopify's analytics suite. |
| n8n\_tracking\_id | .n8n.io | 1 year 1 month |  |
| \_landing\_page | [Shopify Inc.](https://www.shopify.com/legal/privacy)<br> .n8n.io | 2 weeks | This cookie is used to track, report, and analyze on landing pages. |
| rl\_page\_init\_referring\_domain | .n8n.io | 1 year |  |
| AMCV\_XXXXX | [Adobe](https://www.adobe.com/privacy/policy.html)<br> .cloudflare.com | 4 weeks 2 days | Adobe Experience Cloud cookie that enables tracking visitors across multiple domains. |
| AMCVS\_XXXXX | [Adobe](https://www.adobe.com/privacy/policy.html)<br> .cloudflare.com | Session | Adobe Experience Cloud cookie that serves as a flag indicating that the session has been initialized. Its value is always 1 and discontinues when the session has ended. |
| cfz\_google-analytics\_v4 | [Google LLC](https://policies.google.com/privacy)<br> .cloudflare.com | 1 year | Cloudflare Zaraz Google Analytics cookie |
| cfzs\_google-analytics\_v4 | [Google LLC](https://policies.google.com/privacy)<br> .cloudflare.com | Session | Cloudflare Zaraz Google Analytics session cookie |

Cookie report

Targeting cookies are used to identify visitors between different websites, eg. content partners, banner networks. Those cookies may be used by companies to build a profile of visitor interests or show relevant ads on other websites.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| lang | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | Session | linkedin.com targeting |
| li\_sugr | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 2 months 4 weeks | linkedin.com targeting |
| UserMatchHistory | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 4 weeks 2 days | linkedin.com targeting |
| AnalyticsSyncHistory | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 4 weeks 2 days | linkedin.com targeting |
| datr | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | This cookie identifies the browser connecting to Facebook. It is not directly tied to individual Facebook the user. Facebook reports that it is used to help with security and suspicious login activity, especially around detection of bots trying to access the service. Facebook also say the behavioural profile associated with each datr cookie is deleted after 10 days. This cookie is also read via Like and other Facebook buttons and tags placed on many different websites. |
| sb | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | Facebook browser identification, authentication, marketing, and other Facebook-specific function cookies. |
| wd | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 week | This cookie carries out information about how the end user uses the website and any advertising that the end user may have seen before visiting the said website. |
| rdt\_uuid | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .n8n.io | 2 months 4 weeks | Identify users who've seen n8n ads on Reddit so that we can run our ads more efficiently. |
| csv | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year 1 month | This cookie is typically used for tracking user behavior and interaction with the website to improve user experience. |
| edgebucket | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year 1 month | Used by Reddit to deliver advertising |
| loid | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year 1 month | This cookie is used to identify a unique visitor's session and preferences. |
| pc | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year |  |
| reddit\_session | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | Session |  |
| session\_tracker | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | Session | This cookie is used to track user sessions for improving user experience and ensuring secure browsing sessions. It helps in maintaining an active session for the user without needing to log in multiple times during their visit. |
| t2\_XXXXX\_recentclicks3 | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year |  |
| theme | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 year | This cookie is used to store the user's theme preference on the website, allowing for a consistent and personalized visual experience across different pages. |
| token\_v2 | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | 1 day |  |
| IDE | [Google LLC](https://policies.google.com/privacy)<br> .doubleclick.net | 1 year 1 month | Google Ads targeting |
| bcookie | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 1 year | This is a Microsoft MSN 1st party cookie for sharing the content of the website via social media. |
| \_rdt\_uuid | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .n8n.io | 2 months 4 weeks | This cookie is used to identify a browser over time to show relevant advertisements to users by collecting data on their preferences and behavior across multiple sites. |
| YSC | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | Session | This cookie is set by YouTube to track views of embedded videos. |
| guest\_id\_ads | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie is associated with Twitter's advertising services. It is used to identify and track the website visitor to display personalized ads based on the user's preferences and interaction with the website. <br>Provider address: <br>1355 Market St #900, San Francisco, CA 94103 |
| \_\_cf\_bm | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 29 minutes 54 seconds | This is a Cloudflare cookie that is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website. |
| rl\_trait | .n8n.io | 1 year | This cookie is used to collect information about user behavior and preferences to optimize the user experience and for targeted advertising. |
| \_gat\_gtag\_UA\_146470481\_1 | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 1 minute | This cookie is part of Google Analytics and is used to limit requests (throttle request rate). |
| \_fbp | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .n8n.io | 2 months 4 weeks | Used by Meta to deliver a series of advertisement products such as real time bidding from third party advertisers |
| personalization\_id | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie carries out information about how the end user uses the website and any advertising that the end user may have seen before visiting the said website. |
| rl\_group\_trait | .n8n.io | 1 year | This cookie is used for segmenting audiences based on predefined criteria, aiming to provide more personalized and relevant content to the website users. |
| \_\_cf\_bm | [Twitter Inc.](https://twitter.com/privacy)<br> .t.co | 29 minutes 54 seconds | This is a Cloudflare cookie that is used to distinguish between humans and bots. This is beneficial for the website, in order to make valid reports on the use of their website. |
| VISITOR\_INFO1\_LIVE | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | 5 months 4 weeks | This cookie is set by Youtube to keep track of user preferences for Youtube videos embedded in sites;it can also determine whether the website visitor is using the new or old version of the Youtube interface. |
| \_gcl\_au | [Google LLC](https://policies.google.com/privacy)<br> .n8n.io | 2 months 4 weeks | Used by Google AdSense for experimenting with advertisement efficiency across websites using their services |
| guest\_id | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie is set by Twitter to identify and track the website visitor. |
| muc\_ads | [Twitter](https://twitter.com/privacy)<br> .t.co | 1 year 1 month | This cookie is used for targeting and advertising purposes. It helps track and personalize advertising content to enhance user experience. |
| docapp-coupon | [Amazon Web Services, Inc.](https://aws.amazon.com/privacy/)<br> merch.n8n.io | 1 day | This cookie is used to track promotions or offers through which a user accesses the site. It stores coupon codes or special identifiers to apply discounts or special offers upon checkout or sign-up. |
| lidc | [LinkedIn Corporation](https://www.linkedin.com/legal/privacy-policy)<br> .linkedin.com | 1 day | This is a Microsoft MSN 1st party cookie that ensures the proper functioning of this website. |
| guest\_id\_marketing | [Twitter Inc.](https://twitter.com/privacy)<br> .twitter.com | 1 year 1 month | This cookie is used to identify a visitor across visits and devices. It allows the website to present the visitor with relevant advertisement based on the visitor's preferences. |
| ps\_l | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | This cookie is associated with user preferences and saving settings to enhance the user experience on the website. |
| ps\_n | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 1 year 1 month | This cookie is used to remember the user's preferences and previous interactions with the website. |
| fr | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .facebook.com | 2 months 4 weeks | Contains browser and user unique ID combination, used for targeted advertising. |
| csrf\_token | [Reddit, Inc.](https://www.reddit.com/policies/privacy-policy)<br> .reddit.com | Session | This cookie is used by Cloudflare to identify trusted web traffic. |
| cfz\_facebook-pixel | [Meta Platform Inc.](https://www.facebook.com/policy.php)<br> .cloudflare.com | 1 year | Cloudflare Zaraz facebook pixel cookie |

Cookie report

Functionality cookies are used to remember visitor information on the website, eg. language, timezone, enhanced content.

| Name | Provider / Domain | Expiration | Description |
| --- | --- | --- | --- |
| intercom-device-id-XXXXX | [Intercom](https://www.intercom.com/legal/privacy)<br> .hockeystack.com | 5 months 3 weeks |  |
| intercom-id-XXXXX | [Intercom](https://www.intercom.com/legal/privacy)<br> .hockeystack.com | 5 months 3 weeks |  |
| intercom-session-XXXXX | [Intercom](https://www.intercom.com/legal/privacy)<br> .hockeystack.com | 1 week |  |
| brw | [Airtable](https://airtable.com/privacy)<br> .airtable.com | 1 year | This cookie is used to track user behavior and interaction to improve user experience and service functionality. |
| VISITOR\_PRIVACY\_METADATA | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | 5 months 4 weeks | This cookie is used to store the user's consent and privacy choices for their interaction with the site. It records data on the visitor's consent regarding various privacy policies and settings, ensuring that their preferences are honored in future sessions. |
| rl\_user\_id | .n8n.io | 1 year | This cookie is used to recognize and distinguish individual users who visit the website, enabling personalized experiences and interactions. |
| \_\_Secure-ROLLOUT\_TOKEN | [Google LLC](https://policies.google.com/privacy)<br> .youtube.com | 5 months 4 weeks |  |
| paddle\_session | [Paddle](https://www.paddle.com/legal/privacy)<br> .paddle.com | 1 day |  |

Cookie report

Cookies are small text files that are placed on your computer by websites that you visit. Websites use cookies to help users navigate efficiently and perform certain functions. Cookies that are required for the website to operate properly are allowed to be set without your permission. All other cookies need to be approved before they can be set in the browser.

You can change your consent to cookie usage at any time on our Privacy Policy page.

We also use cookies to collect data for the purpose of personalizing and measuring the effectiveness of our advertising. For more details, visit the [Google Privacy Policy](https://business.safety.google/privacy/).

Cookies consent ID :


Cookie [report](https://cookie-script.com/cookie-report?identifier=1b4e80ddbf628b4879ee5c282b121a43) created by [CookieScript](https://cookie-script.com/ "CookieScript Consent Management Platform")

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Simple Memory node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/#simple-memory-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/index.md "Edit this page")

# Simple Memory node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/\#simple-memory-node "Permanent link")

Use the Simple Memory node to [persist](https://docs.n8n.io/glossary/#ai-memory) chat history in your workflow.

On this page, you'll find a list of operations the Simple Memory node supports, and links to more resources.

Don't use this node if running n8n in queue mode

If your n8n instance uses [queue mode](https://docs.n8n.io/hosting/scaling/queue-mode/), this node doesn't work in an active production workflow. This is because n8n can't guarantee that every call to Simple Memory will go to the same worker.

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/\#node-parameters "Permanent link")

Configure these parameters to configure the node:

- **Session Key**: Enter the key to use to store the memory in the workflow data.
- **Context Window Length**: Enter the number of previous interactions to consider for context.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/\#templates-and-examples "Permanent link")

**Chat with GitHub API Documentation: RAG-Powered Chatbot with Pinecone & OpenAI**

by Mihai Farcas

[View template details](https://n8n.io/workflows/2705-chat-with-github-api-documentation-rag-powered-chatbot-with-pinecone-and-openai/)

**🤖 Create a Documentation Expert Bot with RAG, Gemini, and Supabase**

by Lucas Peyrin

[View template details](https://n8n.io/workflows/5993-create-a-documentation-expert-bot-with-rag-gemini-and-supabase/)

**🤖 Build a Documentation Expert Chatbot with Gemini RAG Pipeline**

by Lucas Peyrin

[View template details](https://n8n.io/workflows/6137-build-a-documentation-expert-chatbot-with-gemini-rag-pipeline/)

[Browse Simple Memory node documentation integration templates](https://n8n.io/integrations/window-buffer-memory/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/\#related-resources "Permanent link")

Refer to [LangChain's Buffer Window Memory documentation](https://v03.api.js.langchain.com/classes/langchain.memory.BufferWindowMemory.html) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

## Common issues [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/\#common-issues "Permanent link")

For common questions or issues and suggested solutions, refer to [Common issues](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.memorybufferwindow/common-issues/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Netlify node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.netlify/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.netlify/#netlify-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.netlify.md "Edit this page")

# Netlify node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.netlify/\#netlify-node "Permanent link")

Use the Netlify node to automate work in Netlify, and integrate Netlify with other applications. n8n has built-in support for a wide range of Netlify features, including getting and cancelling deployments, as well as deleting, and getting sites.

On this page, you'll find a list of operations the Netlify node supports and links to more resources.

Credentials

Refer to [Netlify credentials](https://docs.n8n.io/integrations/builtin/credentials/netlify/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.netlify/\#operations "Permanent link")

- Deploy
  - Cancel a deployment
  - Create a new deployment
  - Get a deployment
  - Get all deployments
- Site
  - Delete a site
  - Get a site
  - Returns all sites

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.netlify/\#templates-and-examples "Permanent link")

**Deploy site when new content gets added**

by Harshil Agrawal

[View template details](https://n8n.io/workflows/1254-deploy-site-when-new-content-gets-added/)

**Send notification when deployment fails**

by Harshil Agrawal

[View template details](https://n8n.io/workflows/1255-send-notification-when-deployment-fails/)

**Add Netlify Form submissions to Airtable**

by Harshil Agrawal

[View template details](https://n8n.io/workflows/1253-add-netlify-form-submissions-to-airtable/)

[Browse Netlify integration templates](https://n8n.io/integrations/netlify/), or [search all templates](https://n8n.io/workflows/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Retrieve linked items from earlier in the workflow | n8n Docs  </title>
  <url>https://docs.n8n.io/code/cookbook/builtin/itemmatching/</url>
  <content>
").itemMatching(currentNodeinputIndex)\`">



 Retrieve linked items from earlier in the workflow \| n8n Docs

[Skip to content](https://docs.n8n.io/code/cookbook/builtin/itemmatching/#retrieve-linked-items-from-earlier-in-the-workflow)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/code/cookbook/builtin/itemmatching.md "Edit this page")

# Retrieve linked items from earlier in the workflow [\#](https://docs.n8n.io/code/cookbook/builtin/itemmatching/\#retrieve-linked-items-from-earlier-in-the-workflow "Permanent link")

Every item in a node's input data links back to the items used in previous nodes to generate it. This is useful if you need to retrieve linked items from further back than the immediate previous node.

To access the linked items from earlier in the workflow, use `("<node-name>").itemMatching(currentNodeinputIndex)`.

For example, consider a workflow that does the following:

1. The Customer Datastore node generates example data:



|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>``` | ```<br>[<br>	{<br>		"id": "23423532",<br>		"name": "Jay Gatsby",<br>		"email": "gatsby@west-egg.com",<br>		"notes": "Keeps asking about a green light??",<br>		"country": "US",<br>		"created": "1925-04-10"<br>	},<br>	{<br>		"id": "23423533",<br>		"name": "José Arcadio Buendía",<br>		"email": "jab@macondo.co",<br>		"notes": "Lots of people named after him. Very confusing",<br>		"country": "CO",<br>		"created": "1967-05-05"<br>	},<br>	...<br>]<br>``` |

2. The Edit Fields node simplifies this data:



|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>``` | ```<br>[<br>	{<br>		"name": "Jay Gatsby"<br>	},<br>	{<br>		"name": "José Arcadio Buendía"<br>	},<br>    ...<br>]<br>``` |

3. The Code node restore the email address to the correct person:



|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>``` | ```<br>[<br>	{<br>		"name": "Jay Gatsby",<br>		"restoreEmail": "gatsby@west-egg.com"<br>	},<br>	{<br>		"name": "José Arcadio Buendía",<br>		"restoreEmail": "jab@macondo.co"<br>	},<br>	...<br>]<br>``` |


The Code node does this using the following code:

[JavaScript](https://docs.n8n.io/code/cookbook/builtin/itemmatching/#__tabbed_1_1)[Python](https://docs.n8n.io/code/cookbook/builtin/itemmatching/#__tabbed_1_2)

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>``` | ```<br>for(let i=0; i<$input.all().length; i++) {<br>	$input.all()[i].json.restoreEmail = $('Customer Datastore (n8n training)').itemMatching(i).json.email;<br>}<br>return $input.all();<br>``` |

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>``` | ```<br>for i,item in enumerate(_input.all()):<br>	_input.all()[i].json.restoreEmail = _('Customer Datastore (n8n training)').itemMatching(i).json.email<br>return _input.all();<br>``` |

You can view and download the example workflow from [n8n website \| itemMatchin usage example](https://n8n.io/workflows/1966-itemmatching-usage-example/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Webex by Cisco node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/#webex-by-cisco-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex.md "Edit this page")

# Webex by Cisco node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/\#webex-by-cisco-node "Permanent link")

Use the Webex by Cisco node to automate work in Webex, and integrate Webex with other applications. n8n has built-in support for a wide range of Webex features, including creating, getting, updating, and deleting meetings and messages.

On this page, you'll find a list of operations the Webex node supports and links to more resources.

Credentials

Refer to [Webex credentials](https://docs.n8n.io/integrations/builtin/credentials/ciscowebex/) for guidance on setting up authentication.

Examples and Templates

For usage examples and templates to help you get started, take a look at n8n's [Webex integrations](https://n8n.io/integrations/webex-by-cisco/) list.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/\#operations "Permanent link")

- Meeting
  - Create
  - Delete
  - Get
  - Get All
  - Update
- Message
  - Create
  - Delete
  - Get
  - Get All
  - Update

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/\#templates-and-examples "Permanent link")

[Browse Webex by Cisco integration templates](https://n8n.io/integrations/webex-by-cisco/), or [search all templates](https://n8n.io/workflows/)

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.ciscowebex/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Gmail node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/#gmail-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.gmail/index.md "Edit this page")

# Gmail node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/\#gmail-node "Permanent link")

Use the Gmail node to automate work in Gmail, and integrate Gmail with other applications. n8n has built-in support for a wide range of Gmail features, including creating, updating, deleting, and getting drafts, messages, labels, thread.

On this page, you'll find a list of operations the Gmail node supports and links to more resources.

Credentials

Refer to [Google credentials](https://docs.n8n.io/integrations/builtin/credentials/google/) for guidance on setting up authentication.

This node can be used as an AI tool

This node can be used to enhance the capabilities of an AI agent. When used in this way, many parameters can be set automatically, or with information directed by AI - find out more in the [AI tool parameters documentation](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/\#operations "Permanent link")

- **Draft**
  - [**Create**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#create-a-draft) a draft
  - [**Delete**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#delete-a-draft) a draft
  - [**Get**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#get-a-draft) a draft
  - [**Get Many**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/draft-operations/#get-many-drafts) drafts
- **Label**
  - [**Create**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#create-a-label) a label
  - [**Delete**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#delete-a-label) a label
  - [**Get**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#get-a-label) a label
  - [**Get Many**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/label-operations/#get-many-labels) labels
- **Message**
  - [**Add Label**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#add-label-to-a-message) to a message
  - [**Delete**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#delete-a-message) a message
  - [**Get**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#get-a-message) a message
  - [**Get Many**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#get-many-messages) messages
  - [**Mark as Read**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#mark-as-read)
  - [**Mark as Unread**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#mark-as-unread)
  - [**Remove Label**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#remove-label-from-a-message) from a message
  - [**Reply**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#reply-to-a-message) to a message
  - [**Send**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/message-operations/#send-a-message) a message
- **Thread**
  - [**Add Label**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#add-label-to-a-thread) to a thread
  - [**Delete**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#delete-a-thread) a thread
  - [**Get**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#get-a-thread) a thread
  - [**Get Many**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#get-many-threads) threads
  - [**Remove Label**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#remove-label-from-a-thread) from thread
  - [**Reply**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#reply-to-a-message) to a message
  - [**Trash**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#trash-a-thread) a thread
  - [**Untrash**](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/thread-operations/#untrash-a-thread) a thread

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/\#templates-and-examples "Permanent link")

**✨🤖Automate Multi-Platform Social Media Content Creation with AI**

by Joseph LePage

[View template details](https://n8n.io/workflows/3066-automate-multi-platform-social-media-content-creation-with-ai/)

**Automated Web Scraping: email a CSV, save to Google Sheets & Microsoft Excel**

by Mihai Farcas

[View template details](https://n8n.io/workflows/2275-automated-web-scraping-email-a-csv-save-to-google-sheets-and-microsoft-excel/)

**Suggest meeting slots using AI**

by n8n Team

[View template details](https://n8n.io/workflows/1953-suggest-meeting-slots-using-ai/)

[Browse Gmail integration templates](https://n8n.io/integrations/gmail/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/\#related-resources "Permanent link")

Refer to Google's [Gmail API documentation](https://developers.google.com/gmail/api) for detailed information about the API that this node integrates with.

n8n provides a trigger node for Gmail. You can find the trigger node docs [here](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gmailtrigger/).

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

## Common issues [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/\#common-issues "Permanent link")

For common errors or issues and suggested resolution steps, refer to [Common Issues](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/common-issues/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>AWS Cognito node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/#aws-cognito-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.awscognito.md "Edit this page")

# AWS Cognito node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/\#aws-cognito-node "Permanent link")

Use the AWS Cognito node to automate work in AWS Cognito and integrate AWS Cognito with other applications. n8n has built-in support for a wide range of AWS Cognito features, which includes creating, retrieving, updating, and deleting groups, users, and user pools.

On this page, you'll find a list of operations the AWS Cognito node supports, and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/aws/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/\#operations "Permanent link")

- Group:
  - Create: Create a new group.
  - Delete: Delete an existing group.
  - Get: Retrieve details about an existing group.
  - Get Many: Retrieve a list of groups.
  - Update: Update an existing group.
- User:
  - Add to Group: Add an existing user to a group.
  - Create: Create a new user.
  - Delete: Delete a user.
  - Get: Retrieve information about an existing user.
  - Get Many: Retrieve a list of users.
  - Remove From Group: Remove a user from a group.
  - Update: Update an existing user.
- User Pool:
  - Get: Retrieve information about an existing user pool.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/\#templates-and-examples "Permanent link")

**Transcribe audio files from Cloud Storage**

by Lorena

[View template details](https://n8n.io/workflows/1394-transcribe-audio-files-from-cloud-storage/)

**Extract and store text from chat images using AWS S3**

by Lorena

[View template details](https://n8n.io/workflows/1393-extract-and-store-text-from-chat-images-using-aws-s3/)

**Sync data between Google Drive and AWS S3**

by Lorena

[View template details](https://n8n.io/workflows/1396-sync-data-between-google-drive-and-aws-s3/)

[Browse AWS Cognito integration templates](https://n8n.io/integrations/aws-cognito/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/\#related-resources "Permanent link")

Refer to [AWS Cognito's documentation](https://docs.aws.amazon.com/cognito/) for more information about the service.

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awscognito/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Shuffler credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/shuffler/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/shuffler/#shuffler-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/shuffler.md "Edit this page")

# Shuffler credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/shuffler/\#shuffler-credentials "Permanent link")

You can use these credentials to authenticate when using the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](https://docs.n8n.io/integrations/custom-operations/).

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/shuffler/\#prerequisites "Permanent link")

Create a [Shuffler](https://shuffler.io/) account on either a cloud or self-hosted instance.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/shuffler/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/shuffler/\#related-resources "Permanent link")

Refer to [Shuffler's documentation](https://shuffler.io/docs/API#authentication) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/shuffler/) on n8n's website.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/shuffler/\#using-api-key "Permanent link")

To configure this credential, you'll need:

- An **API Key**: Get your API key from the **Settings** page.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Clockify Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.clockifytrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.clockifytrigger/#clockify-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.clockifytrigger.md "Edit this page")

# Clockify Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.clockifytrigger/\#clockify-trigger-node "Permanent link")

[Clockify](https://clockify.me/) is a free time tracker and timesheet app for tracking work hours across projects.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/clockify/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Clockify Trigger integrations](https://n8n.io/integrations/clockify-trigger/) page.

This node uses the workflow timezone setting to specify the range of time entries starting time. Configure the timezone in your [Workflow Settings](https://docs.n8n.io/workflows/settings/) if you want this trigger node to retrieve the right time entries.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>MessageBird node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.messagebird/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.messagebird/#messagebird-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.messagebird.md "Edit this page")

# MessageBird node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.messagebird/\#messagebird-node "Permanent link")

Use the MessageBird node to automate work in MessageBird, and integrate MessageBird with other applications. n8n has built-in support for a wide range of MessageBird features, including sending messages, and getting balances.

On this page, you'll find a list of operations the MessageBird node supports and links to more resources.

Credentials

Refer to [MessageBird credentials](https://docs.n8n.io/integrations/builtin/credentials/messagebird/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.messagebird/\#operations "Permanent link")

- SMS
  - Send text messages (SMS)
- Balance
  - Get the balance

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.messagebird/\#templates-and-examples "Permanent link")

[Browse MessageBird integration templates](https://n8n.io/integrations/messagebird/), or [search all templates](https://n8n.io/workflows/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Facebook Trigger | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/#facebook-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/index.md "Edit this page")

# Facebook Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/\#facebook-trigger-node "Permanent link")

[Facebook](https://www.facebook.com/) is a social networking site to connect and share with family and friends online.

Use the Facebook Trigger node to trigger a workflow when events occur in Facebook.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/facebookapp/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Facebook Trigger integrations](https://n8n.io/integrations/facebook-trigger/) page.

## Objects [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/\#objects "Permanent link")

- [**Ad Account**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/ad-account/): Get updates for certain ads changes.
- [**Application**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/application/): Get updates sent to the application.
- [**Certificate Transparency**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/certificate-transparency/): Get updates when new security certificates are generated for your subscribed domains, including new certificates and potential phishing attempts.
- Activity and events in a [**Group**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/group/)
- [**Instagram**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/instagram/): Get updates when someone comments on the Media objects of your app users; @mentions your app users; or when Stories of your app users expire.
- [**Link**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/link/): Get updates about the links for rich previews by an external provider
- [**Page**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/page/) updates
- [**Permissions**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/permissions/): Updates when granting or revoking permissions
- [**User**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/user/) profile updates
- [**WhatsApp Business Account**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/whatsapp/)



Use WhatsApp Trigger



n8n recommends using the [WhatsApp Trigger node](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.whatsapptrigger/) with the [WhatsApp credentials](https://docs.n8n.io/integrations/builtin/credentials/whatsapp/) instead of the Facebook Trigger node for these events. The WhatsApp Trigger node has more events to listen to.

- [**Workplace Security**](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/workplace-security/)


For each **Object**, use the **Field Names or IDs** dropdown to select more details on what data to receive. Refer to the linked pages for more details.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.facebooktrigger/\#related-resources "Permanent link")

View [example workflows and related content](https://n8n.io/integrations/facebook-trigger/) on n8n's website.

Refer to Meta's [Graph API documentation](https://developers.facebook.com/docs/graph-api/webhooks/reference) for details about their API.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Milvus Vector Store node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/#milvus-vector-store-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus.md "Edit this page")

# Milvus Vector Store node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#milvus-vector-store-node "Permanent link")

Use the Milvus node to interact with your Milvus database as [vector store](https://docs.n8n.io/glossary/#ai-vector-store). You can insert documents into a vector database, get documents from a vector database, retrieve documents to provide them to a retriever connected to a [chain](https://docs.n8n.io/glossary/#ai-chain), or connect directly to an [agent](https://docs.n8n.io/glossary/#ai-agent) as a [tool](https://docs.n8n.io/glossary/#ai-tool).

On this page, you'll find the node parameters for the Milvus node, and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/milvus/).

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Node usage patterns [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#node-usage-patterns "Permanent link")

You can use the Milvus Vector Store node in the following patterns.

### Use as a regular node to insert and retrieve documents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#use-as-a-regular-node-to-insert-and-retrieve-documents "Permanent link")

You can use the Milvus Vector Store as a regular node to insert, or get documents. This pattern places the Milvus Vector Store in the regular connection flow without using an agent.

See this [example template](https://n8n.io/workflows/3573-create-a-rag-system-with-paul-essays-milvus-and-openai-for-cited-answers/) for how to build a system that stores documents in Milvus and retrieves them to support cited, chat-based answers.

### Connect directly to an AI agent as a tool [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#connect-directly-to-an-ai-agent-as-a-tool "Permanent link")

You can connect the Milvus Vector Store node directly to the tool connector of an [AI agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) to use a vector store as a resource when answering queries.

Here, the connection would be: AI agent (tools connector) -> Milvus Vector Store node. See this [example template](https://n8n.io/workflows/3576-paul-graham-essay-search-and-chat-with-milvus-vector-database/) where data is embedded and indexed in Milvus, and the AI Agent uses the vector store as a knowledge tool for question-answering.

### Use a retriever to fetch documents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#use-a-retriever-to-fetch-documents "Permanent link")

You can use the [Vector Store Retriever](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.retrievervectorstore/) node with the Milvus Vector Store node to fetch documents from the Milvus Vector Store node. This is often used with the [Question and Answer Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/) node to fetch documents from the vector store that match the given chat input.

A typical node connection flow looks like this: Question and Answer Chain (Retriever connector) -> Vector Store Retriever (Vector Store connector) -> Milvus Vector Store.

Check out this [workflow example](https://n8n.io/workflows/3574-create-a-paul-graham-essay-qanda-system-with-openai-and-milvus-vector-database/) to see how to ingest external data into Milvus and build a chat-based semantic Q&A system.

### Use the Vector Store Question Answer Tool to answer questions [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#use-the-vector-store-question-answer-tool-to-answer-questions "Permanent link")

Another pattern uses the [Vector Store Question Answer Tool](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolvectorstore/) to summarize results and answer questions from the Milvus Vector Store node. Rather than connecting the Milvus Vector Store directly as a tool, this pattern uses a tool specifically designed to summarizes data in the vector store.

The connections flow would look like this: AI agent (tools connector) -> Vector Store Question Answer Tool (Vector Store connector) -> Milvus Vector store.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#node-parameters "Permanent link")

### Operation Mode [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#operation-mode "Permanent link")

This Vector Store node has four modes: **Get Many**, **Insert Documents**, **Retrieve Documents (As Vector Store for Chain/Tool)**, and **Retrieve Documents (As Tool for AI Agent)**. The mode you select determines the operations you can perform with the node and what inputs and outputs are available.

#### Get Many [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#get-many "Permanent link")

In this mode, you can retrieve multiple documents from your vector database by providing a prompt. The prompt is embedded and used for similarity search. The node returns the documents that are most similar to the prompt with their similarity score. This is useful if you want to retrieve a list of similar documents and pass them to an agent as additional context.

#### Insert Documents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#insert-documents "Permanent link")

Use insert documents mode to insert new documents into your vector database.

#### Retrieve Documents (as Vector Store for Chain/Tool) [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#retrieve-documents-as-vector-store-for-chaintool "Permanent link")

Use Retrieve Documents (As Vector Store for Chain/Tool) mode with a vector-store retriever to retrieve documents from a vector database and provide them to the retriever connected to a chain. In this mode you must connect the node to a retriever node or root node.

#### Retrieve Documents (as Tool for AI Agent) [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#retrieve-documents-as-tool-for-ai-agent "Permanent link")

Use Retrieve Documents (As Tool for AI Agent) mode to use the vector store as a tool resource when answering queries. When formulating responses, the agent uses the vector store when the vector store name and description match the question details.

### Rerank Results [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#rerank-results "Permanent link")

Enables [reranking](https://docs.n8n.io/glossary/#ai-reranking). If you enable this option, you must connect a reranking node to the vector store. That node will then rerank the results for queries. You can use this option with the `Get Many`, `Retrieve Documents (As Vector Store for Chain/Tool)` and `Retrieve Documents (As Tool for AI Agent)` modes.

### Get Many parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#get-many-parameters "Permanent link")

- **Milvus Collection**: Select or enter the Milvus Collection to use.
- **Prompt**: Enter your search query.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

### Insert Documents parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#insert-documents-parameters "Permanent link")

- **Milvus Collection**: Select or enter the Milvus Collection to use.
- **Clear Collection**: Specify whether to clear the collection before inserting new documents.

### Retrieve Documents (As Vector Store for Chain/Tool) parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#retrieve-documents-as-vector-store-for-chaintool-parameters "Permanent link")

- **Milvus collection**: Select or enter the Milvus Collection to use.

### Retrieve Documents (As Tool for AI Agent) parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#retrieve-documents-as-tool-for-ai-agent-parameters "Permanent link")

- **Name**: The name of the vector store.
- **Description**: Explain to the LLM what this tool does. A good, specific description allows LLMs to produce expected results more often.
- **Milvus Collection**: Select or enter the Milvus Collection to use.
- **Limit**: Enter how many results to retrieve from the vector store. For example, set this to `10` to get the ten best results.

## Node options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#node-options "Permanent link")

### Metadata Filter [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#metadata-filter "Permanent link")

Available in **Get Many** mode. When searching for data, use this to match with metadata associated with the document.

This is an `AND` query. If you specify more than one metadata filter field, all of them must match.

When inserting data, the metadata is set using the document loader. Refer to [Default Data Loader](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.documentdefaultdataloader/) for more information on loading documents.

### Clear Collection [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#clear-collection "Permanent link")

Available in **Insert Documents** mode. Deletes all data from the collection before inserting the new data.

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.vectorstoremilvus/\#related-resources "Permanent link")

Refer to [LangChain's Milvus documentation](https://js.langchain.com/docs/integrations/vectorstores/milvus/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>RSS Feed Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/#rss-feed-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger.md "Edit this page")

# RSS Feed Trigger node [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#rss-feed-trigger-node "Permanent link")

The RSS Feed Trigger node allows you to start an n8n workflow when a new RSS feed item has been published.

On this page, you'll find a list of operations the RSS Feed Trigger node supports, and links to more resources.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#node-parameters "Permanent link")

- **Poll Times**: Select a poll **Mode** to set how often to trigger the poll. Your **Mode** selection will add or remove relevant fields. Refer to the sections below to configure the parameters for each mode type.
- **Feed URL**: Enter the URL of the RSS feed to poll.

### Every Hour mode [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#every-hour-mode "Permanent link")

Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.

### Every Day mode [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#every-day-mode "Permanent link")

- Enter the **Hour** of the day to trigger the poll in 24-hour format, from `0` to `23`.
- Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.

### Every Week mode [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#every-week-mode "Permanent link")

- Enter the **Hour** of the day to trigger the poll in 24-hour format, from `0` to `23`.
- Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.
- Select the **Weekday** to trigger the poll.

### Every Month mode [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#every-month-mode "Permanent link")

- Enter the **Hour** of the day to trigger the poll in 24-hour format, from `0` to `23`.
- Enter the **Minute** of the hour to trigger the poll, from `0` to `59`.
- Enter the **Day of the Month** to trigger the poll, from `0` to `31`.

### Every X mode [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#every-x-mode "Permanent link")

- Enter the **Value** of measurement for how often to trigger the poll in either minutes or hours.
- Select the **Unit** for the value. Supported units are **Minutes** and **Hours**.

### Custom mode [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#custom-mode "Permanent link")

Enter a custom **Cron Expression** to trigger the poll. Use these values and ranges:

- Seconds: `0` \- `59`
- Minutes: `0` \- `59`
- Hours: `0` \- `23`
- Day of Month: `1` \- `31`
- Months: `0` \- `11` (Jan - Dec)
- Day of Week: `0` \- `6` (Sun - Sat)

To generate a Cron expression, you can use [crontab guru](https://crontab.guru/). Paste the Cron expression that you generated using crontab guru in the **Cron Expression** field in n8n.

#### Examples [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#examples "Permanent link")

If you want to trigger your workflow every day at 04:08:30, enter the following in the **Cron Expression** field.

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>30 8 4 * * *<br>``` |

If you want to trigger your workflow every day at 04:08, enter the following in the **Cron Expression** field.

|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>8 4 * * *<br>``` |

#### Why there are six asterisks in the Cron expression [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#why-there-are-six-asterisks-in-the-cron-expression "Permanent link")

The sixth asterisk in the Cron expression represents seconds. Setting this is optional. The node will execute even if you don't set the value for seconds.

| \* | \* | \* | \* | \* | \* |
| --- | --- | --- | --- | --- | --- |
| second | minute | hour | day of month | month | day of week |

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#templates-and-examples "Permanent link")

**Create an RSS feed based on a website's content**

by Tom

[View template details](https://n8n.io/workflows/1418-create-an-rss-feed-based-on-a-websites-content/)

**Scrape and summarize posts of a news site without RSS feed using AI and save them to a NocoDB**

by Askan

[View template details](https://n8n.io/workflows/2180-scrape-and-summarize-posts-of-a-news-site-without-rss-feed-using-ai-and-save-them-to-a-nocodb/)

**Generate Youtube Video Metadata (Timestamps, Tags, Description, ...)**

by Nasser

[View template details](https://n8n.io/workflows/4506-generate-youtube-video-metadata-timestamps-tags-description/)

[Browse RSS Feed Trigger integration templates](https://n8n.io/integrations/rss-feed-trigger/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedreadtrigger/\#related-resources "Permanent link")

n8n provides an app node for RSS Feeds. You can find the node docs [here](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.rssfeedread/).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Microsoft OneDrive Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger/#microsoft-onedrive-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger.md "Edit this page")

# Microsoft OneDrive Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger/\#microsoft-onedrive-trigger-node "Permanent link")

Use the Microsoft OneDrive Trigger node to respond to events in [Microsoft OneDrive](https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage) and integrate Microsoft OneDrive with other applications. n8n has built-in support for file and folder events in OneDrive.

On this page, you'll find a list of events the Microsoft OneDrive Trigger node can respond to and links to more resources.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/microsoft/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Microsoft OneDrive integrations](https://n8n.io/integrations/microsoft-onedrive-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger/\#events "Permanent link")

- On File Created
- On File Updated
- On Folder Created
- On Folder Updates

## Related resources [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.microsoftonedrivetrigger/\#related-resources "Permanent link")

n8n provides an app node for Microsoft OneDrive. You can find the node docs [here](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.microsoftonedrive/).

View [example workflows and related content](https://n8n.io/integrations/microsoft-onedrive-trigger/) on n8n's website.

Refer to [Microsoft's OneDrive API documentation](https://learn.microsoft.com/en-us/onedrive/developer/rest-api/) for more information about the service.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>HighLevel node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/#highlevel-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.highlevel.md "Edit this page")

# HighLevel node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/\#highlevel-node "Permanent link")

Use the HighLevel node to automate work in HighLevel, and integrate HighLevel with other applications. n8n has built-in support for a wide range of HighLevel features, including creating, updating, deleting, and getting contacts, opportunities, and tasks, as well as booking appointments and getting free time slots in calendars.

On this page, you'll find a list of operations the HighLevel node supports and links to more resources.

Credentials

Refer to [HighLevel credentials](https://docs.n8n.io/integrations/builtin/credentials/highlevel/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/\#operations "Permanent link")

- Contact
  - Create or update
  - Delete
  - Get
  - Get many
  - Update
- Opportunity
  - Create
  - Delete
  - Get
  - Get many
  - Update
- Task
  - Create
  - Delete
  - Get
  - Get many
  - Update
- Calendar
  - Book an appointment
  - Get free slots

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/\#templates-and-examples "Permanent link")

**High-Level Service Page SEO Blueprint Report Generator**

by Custom Workflows AI

[View template details](https://n8n.io/workflows/3583-high-level-service-page-seo-blueprint-report-generator/)

**Verify mailing address deliverability of new contacts in HighLevel Using Lob**

by Belmont Digital

[View template details](https://n8n.io/workflows/2171-verify-mailing-address-deliverability-of-new-contacts-in-highlevel-using-lob/)

**Create an Automated Customer Support Assistant with GPT-4o and GoHighLevel SMS**

by Cyril Nicko Gaspar

[View template details](https://n8n.io/workflows/4223-create-an-automated-customer-support-assistant-with-gpt-4o-and-gohighlevel-sms/)

[Browse HighLevel integration templates](https://n8n.io/integrations/highlevel/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/\#related-resources "Permanent link")

Refer to [HighLevel's API documentation and support forums](https://help.gohighlevel.com/support/solutions/articles/48001060529-highlevel-api) for more information about the service.

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.highlevel/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>JotForm credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/jotform/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/jotform/#jotform-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/jotform.md "Edit this page")

# JotForm credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/jotform/\#jotform-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [JotForm Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.jotformtrigger/)

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/jotform/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/jotform/\#related-resources "Permanent link")

Refer to [JotForm's API documentation](https://api.jotform.com/docs/) for more information about the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/jotform/\#using-api-key "Permanent link")

To configure this credential, you'll need a [JotForm](https://www.jotform.com/) account and:

- An **API Key**
- The **API Domain**

To set it up:

1. Go to **Settings >** [**API**](https://www.jotform.com/myaccount/api).
2. Select **Create New Key**.
3. Select the **Name** in JotForm to update the API key name to something meaningful, like `n8n integration`.
4. Copy the **API Key** and enter it in your n8n credential.
5. In n8n, select the **API Domain** that applies to you based on the forms you're using:
   - **api.jotform.com**: Use this unless the other form types apply to you.
   - **eu-api.jotform.com**: Select this if you're using JotForm [EU Safe Forms](https://www.jotform.com/eu-safe-forms/).
   - **hipaa-api.jotform.com**: Select this if you're using JotForm [HIPAA forms](https://www.jotform.com/hipaa/).

Refer to the [JotForm API documentation](https://api.jotform.com/docs/) for more information on creating keys and API domains.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>PayPal node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.paypal/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.paypal/#paypal-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.paypal.md "Edit this page")

# PayPal node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.paypal/\#paypal-node "Permanent link")

Use the PayPal node to automate work in PayPal, and integrate PayPal with other applications. n8n has built-in support for a wide range of PayPal features, including creating a batch payout and canceling unclaimed payout items.

On this page, you'll find a list of operations the PayPal node supports and links to more resources.

Credentials

Refer to [PayPal credentials](https://docs.n8n.io/integrations/builtin/credentials/paypal/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.paypal/\#operations "Permanent link")

- Payout
  - Create a batch payout
  - Show batch payout details
- Payout Item
  - Cancels an unclaimed payout item
  - Show payout item details

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.paypal/\#templates-and-examples "Permanent link")

**Create a PayPal batch payout**

by ivov

[View template details](https://n8n.io/workflows/438-create-a-paypal-batch-payout/)

**Receive updates when a billing plan is activated in PayPal**

by Harshil Agrawal

[View template details](https://n8n.io/workflows/653-receive-updates-when-a-billing-plan-is-activated-in-paypal/)

**Automate Digital Delivery After PayPal Purchase Using n8n**

by Amjid Ali

[View template details](https://n8n.io/workflows/3697-automate-digital-delivery-after-paypal-purchase-using-n8n/)

[Browse PayPal integration templates](https://n8n.io/integrations/paypal/), or [search all templates](https://n8n.io/workflows/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Versioning | n8n Docs  </title>
  <url>https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/#node-versioning)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/creating-nodes/build/reference/node-versioning.md "Edit this page")

# Node versioning [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/\#node-versioning "Permanent link")

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version.

Be aware of how n8n decides which node version to load:

- If a user builds and saves a workflow using version 1, n8n continues to use version 1 in that workflow, even if you create and publish a version 2 of the node.
- When a user creates a new workflow and browses for nodes, n8n always loads the latest version of the node.

Versioning type restricted by node style

If you build a node using the declarative style, you can't use full versioning.

## Light versioning [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/\#light-versioning "Permanent link")

This is available for all node types.

One node can contain more than one version, allowing small version increments without code duplication. To use this feature:

1. Change the main `version` parameter to an array, and add your version numbers, including your existing version.
2. You can then access the version parameter with `@version` in your `displayOptions` in any object (to control which versions n8n displays the object with). You can also query the version from a function using `const nodeVersion = this.getNode().typeVersion;`.

As an example, say you want to add versioning to the NasaPics node from the [Declarative node tutorial](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/), then configure a resource so that n8n only displays it in version 2 of the node. In your base `NasaPics.node.ts` file:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>``` | ```<br>{<br>    displayName: 'NASA Pics',<br>    name: 'NasaPics',<br>    icon: 'file:nasapics.svg',<br>    // List the available versions<br>    version: [1,2,3],<br>    // More basic parameters here<br>    properties: [<br>        // Add a resource that's only displayed for version2<br>        {<br>            displayName: 'Resource name',<br>            // More resource parameters<br>            displayOptions: {<br>                show: {<br>                    '@version': 2,<br>                },<br>            },<br>        },<br>    ],<br>}<br>``` |

## Full versioning [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/\#full-versioning "Permanent link")

This isn't available for declarative-style nodes.

As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost).

Full versioning summary:

- The base node file should extend `NodeVersionedType` instead of `INodeType`.
- The base node file should contain a description including the `defaultVersion` (usually the latest), other basic node metadata such as name, and a list of versions. It shouldn't contain any node functionality.
- n8n recommends using `v1`, `v2`, and so on, for version folder names.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Rapid7 InsightVM credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/#rapid7-insightvm-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/rapid7insightvm.md "Edit this page")

# Rapid7 InsightVM credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/\#rapid7-insightvm-credentials "Permanent link")

You can use these credentials to authenticate when using the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](https://docs.n8n.io/integrations/custom-operations/).

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/\#prerequisites "Permanent link")

Create a [Rapid7 InsightVM](https://www.rapid7.com/products/insightvm/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/\#related-resources "Permanent link")

Refer to [Rapid7 InsightVM's API documentation](https://help.rapid7.com/insightvm/en-us/api/integrations.html) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) to learn more. View [example workflows and related content](https://n8n.io/integrations/rapid7-insight-platform/) on n8n's website.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/rapid7insightvm/\#using-api-key "Permanent link")

To configure this credential, you'll need a [Rapid7 InsightVM](https://www.rapid7.com/products/insightvm/) account and:

- A **URL**: The API endpoint URL where the resource or data you are requesting lives. You can find more information about the expected format in the [endpoint section of the Rapid7's API overview](https://docs.rapid7.com/insight/api-overview/#endpoint).
- An **API Key**: Refer to [Rapid7's Managing Platform API Keys documentation](https://docs.rapid7.com/insight/managing-platform-api-keys/) to create an API key.

Refer to [Rapid7 InsightVM's API documentation](https://help.rapid7.com/insightvm/en-us/api/integrations.html) for more information about authenticating to the service.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Sysdig credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/sysdig/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/sysdig/#sysdig-management-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/sysdig.md "Edit this page")

# Sysdig Management credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/sysdig/\#sysdig-management-credentials "Permanent link")

You can use these credentials to authenticate when using the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to make a [Custom API call](https://docs.n8n.io/integrations/custom-operations/).

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/sysdig/\#prerequisites "Permanent link")

Create a [Sysdig](https://sysdig.com/) account or configure a local instance.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/sysdig/\#supported-authentication-methods "Permanent link")

- Access Key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/sysdig/\#related-resources "Permanent link")

Refer to [Sysdig's documentation](https://docs.sysdig.com/en/docs/developer-tools/sysdig-api/) for more information about the service.

This is a credential-only node. Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) to learn more.

## Using API access key [\#](https://docs.n8n.io/integrations/builtin/credentials/sysdig/\#using-api-access-key "Permanent link")

To configure this credential, you'll need:

- An **Access Key**

Refer to the [Sysdig Agent Access Keys documentation](https://docs.sysdig.com/en/docs/administration/agent_access_key/) for instructions on obtaining the Access Key from the application.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Mocean credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/mocean/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/mocean/#mocean-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/mocean.md "Edit this page")

# Mocean credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/mocean/\#mocean-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Mocean](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.mocean/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/mocean/\#prerequisites "Permanent link")

Create a [Mocean](https://moceanapi.com/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/mocean/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/mocean/\#related-resources "Permanent link")

Refer to [Mocean's API documentation](https://moceanapi.com/docs/) for more information about the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/mocean/\#using-api-key "Permanent link")

To configure this credential, you'll need:

- An **API Key**
- An **API Secret**

Both the key and secret are accessible in your Mocean [Dashboard](https://dashboard.moceanapi.com/). Refer to [API Authentication](https://moceanapi.com/docs/#authentication) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Bitly node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bitly/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bitly/#bitly-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.bitly.md "Edit this page")

# Bitly node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bitly/\#bitly-node "Permanent link")

Use the Bitly node to automate work in Bitly, and integrate Bitly with other applications. n8n has built-in support for a wide range of Bitly features, including creating, getting, and updating links.

On this page, you'll find a list of operations the Bitly node supports and links to more resources.

Credentials

Refer to [Bitly credentials](https://docs.n8n.io/integrations/builtin/credentials/bitly/) for guidance on setting up authentication.

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bitly/\#operations "Permanent link")

- Link
  - Create a link
  - Get a link
  - Update a link

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bitly/\#templates-and-examples "Permanent link")

**Explore n8n Nodes in a Visual Reference Library**

by I versus AI

[View template details](https://n8n.io/workflows/3891-explore-n8n-nodes-in-a-visual-reference-library/)

**Create a URL on Bitly**

by sshaligr

[View template details](https://n8n.io/workflows/442-create-a-url-on-bitly/)

**Automate URL Shortening with Bitly Using Llama3 Chat Interface**

by Ghufran Ridhawi

[View template details](https://n8n.io/workflows/3885-automate-url-shortening-with-bitly-using-llama3-chat-interface/)

[Browse Bitly integration templates](https://n8n.io/integrations/bitly/), or [search all templates](https://n8n.io/workflows/)

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.bitly/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Get the binary data buffer | n8n Docs  </title>
  <url>https://docs.n8n.io/code/cookbook/code-node/get-binary-data-buffer/</url>
  <content>
[Skip to content](https://docs.n8n.io/code/cookbook/code-node/get-binary-data-buffer/#get-the-binary-data-buffer)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/code/cookbook/code-node/get-binary-data-buffer.md "Edit this page")

# Get the binary data buffer [\#](https://docs.n8n.io/code/cookbook/code-node/get-binary-data-buffer/\#get-the-binary-data-buffer "Permanent link")

The binary data buffer contains all the binary file data processed by a workflow. You need to access it if you want to perform operations on the binary data, such as:

- Manipulating the data: for example, adding column headers to a CSV file.
- Using the data in calculations: for example, calculating a hash value based on it.
- Complex HTTP requests: for example, combining file upload with sending other data formats.

Not available in Python

`getBinaryDataBuffer()` isn't supported when using Python.

You can access the buffer using n8n's `getBinaryDataBuffer()` function:

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>``` | ```<br>/* <br>* itemIndex: number. The index of the item in the input data.<br>* binaryPropertyName: string. The name of the binary property. <br>* The default in the Read/Write File From Disk node is 'data'. <br>*/<br>let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);<br>``` |

For example:

|     |     |
| --- | --- |
| ```<br>1<br>2<br>``` | ```<br>let binaryDataBufferItem = await this.helpers.getBinaryDataBuffer(0, 'data');<br>// Returns the data in the binary buffer for the first input item<br>``` |

You should always use the `getBinaryDataBuffer()` function, and avoid using older methods of directly accessing the buffer, such as targeting it with expressions like `items[0].binary.data.data`.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Zendesk Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.zendesktrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.zendesktrigger/#zendesk-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.zendesktrigger.md "Edit this page")

# Zendesk Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.zendesktrigger/\#zendesk-trigger-node "Permanent link")

[Zendesk](https://www.zendesk.com/) is a support ticketing system, designed to help track, prioritize, and solve customer support interactions. More than just a help desk, Zendesk Support helps nurture customer relationships with personalized, responsive support across any channel.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/zendesk/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Zendesk Trigger integrations](https://n8n.io/integrations/zendesk-trigger/) page.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>APITemplate.io credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/#apitemplateio-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/apitemplateio.md "Edit this page")

# APITemplate.io credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/\#apitemplateio-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [APITemplate.io](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.apitemplateio/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/\#prerequisites "Permanent link")

Create an [APITemplate.io](https://apitemplate.io/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/\#related-resources "Permanent link")

Refer to [APITemplate.io's API documentation](https://apitemplate.io/apiv2/) for more information about the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/apitemplateio/\#using-api-key "Permanent link")

To configure this credential, you'll need:

- An **API Key**: Once you've created an APITemplate.io account, go to **API Integration** to copy the **API Key**.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Emelia Trigger node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.emeliatrigger/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.emeliatrigger/#emelia-trigger-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/trigger-nodes/n8n-nodes-base.emeliatrigger.md "Edit this page")

# Emelia Trigger node [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.emeliatrigger/\#emelia-trigger-node "Permanent link")

[Emelia](https://emelia.io/) is a cold-mailing tool.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/emelia/).

Examples and templates

For usage examples and templates to help you get started, refer to n8n's [Emelia Trigger integrations](https://n8n.io/integrations/emelia-trigger/) page.

## Events [\#](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.emeliatrigger/\#events "Permanent link")

- Email Bounced
- Email Opened
- Email Replied
- Email Sent
- Link Clicked
- Unsubscribed Contact

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Update your n8n Cloud version | n8n Docs  </title>
  <url>https://docs.n8n.io/manage-cloud/update-cloud-version/</url>
  <content>
[Skip to content](https://docs.n8n.io/manage-cloud/update-cloud-version/#update-your-cloud-version)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/manage-cloud/update-cloud-version.md "Edit this page")

# Update your Cloud version [\#](https://docs.n8n.io/manage-cloud/update-cloud-version/\#update-your-cloud-version "Permanent link")

n8n recommends regularly updating your Cloud version. Check the [Release notes](https://docs.n8n.io/release-notes/) to learn more about changes.

Info

Only instance owners can upgrade n8n Cloud versions. Contact your instance owner if you don't have permission to update n8n Cloud.

1. [Log in to the n8n Cloud dashboard](https://app.n8n.cloud/manage)
2. On your dashboard, select **Manage**.
3. Use the **n8n version** dropdown to select your preferred release version:
   - Latest Stable: recommended for most users.
   - Latest Beta: get the newest n8n. This may be unstable.
4. Select **Save Changes** to restart your n8n instance and perform the update.
5. In the confirmation modal, select **Confirm**.

## Best practices for updating [\#](https://docs.n8n.io/manage-cloud/update-cloud-version/\#best-practices-for-updating "Permanent link")

- Update frequently: this avoids having to jump multiple versions at once, reducing the risk of a disruptive update. Try to update at least once a month.
- Check the [Release notes](https://docs.n8n.io/release-notes/) for breaking changes.
- Use [Environments](https://docs.n8n.io/source-control-environments/) to create a test version of your instance. Test the update there first.

## Automatic update [\#](https://docs.n8n.io/manage-cloud/update-cloud-version/\#automatic-update "Permanent link")

n8n automatically updates outdated Cloud instances.

If you don't update you instance for 120 days, n8n emails you to warn you to update. After a further 30 days, n8n automatically updates your instance.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Home Assistant credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/homeassistant/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/homeassistant/#home-assistant-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/homeassistant.md "Edit this page")

# Home Assistant credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/homeassistant/\#home-assistant-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Home Assistant](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.homeassistant/)

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/homeassistant/\#supported-authentication-methods "Permanent link")

- API access token

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/homeassistant/\#related-resources "Permanent link")

Refer to [Home Assistant's API documentation](https://developers.home-assistant.io/docs/api/rest) for more information about the service.

## Using API access token [\#](https://docs.n8n.io/integrations/builtin/credentials/homeassistant/\#using-api-access-token "Permanent link")

To configure this credential, you'll need to [Install](https://www.home-assistant.io/installation/) Home Assistant, create a [Home Assistant](https://www.home-assistant.io/getting-started/onboarding) account, and have:

- Your **Host**
- The **Port**
- A Long-Lived **Access Token**

To generate an access token and set up the credential:

1. To generate your **Access Token**, log in to Home Assistant and open your [User profile](https://my.home-assistant.io/redirect/profile).
2. In the **Long-Lived Access Tokens** section, generate a new token.
3. Copy this token and enter it in n8n as your **Access Token**.
4. Enter the URL or IP address of your Home Assistant **Host**, without the `http://` or `https://` protocol, for example `your.awesome.home`.
5. For the **Port**, enter the appropriate port:
   - If you've made no port changes and access Home Assistant at `http://`, keep the default of `8123`.
   - If you've made no port changes and access Home Assistant at `https://`, enter `443`.
   - If you've configured Home Assistant to use a specific port, enter that port.
6. If you've enabled SSL in Home Assistant in the [config.yml map key](https://developers.home-assistant.io/docs/add-ons/configuration/?_highlight=ssl#add-on-configuration), turn on the **SSL** toggle in n8n. If you're not sure, it's best to turn this setting on if you access your home assistant UI using `https://` instead of `http://`.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>GitLab node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/#gitlab-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/app-nodes/n8n-nodes-base.gitlab.md "Edit this page")

# GitLab node [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/\#gitlab-node "Permanent link")

Use the GitLab node to automate work in GitLab, and integrate GitLab with other applications. n8n has built-in support for a wide range of GitLab features, including creating, updating, deleting, and editing issues, repositories, releases and users.

On this page, you'll find a list of operations the GitLab node supports and links to more resources.

Credentials

Refer to [GitLab credentials](https://docs.n8n.io/integrations/builtin/credentials/gitlab/) for guidance on setting up authentication.

This node can be used as an AI tool

This node can be used to enhance the capabilities of an AI agent. When used in this way, many parameters can be set automatically, or with information directed by AI - find out more in the [AI tool parameters documentation](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/).

## Operations [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/\#operations "Permanent link")

- File
  - Create
  - Delete
  - Edit
  - Get
  - List
- Issue
  - Create a new issue
  - Create a new comment on an issue
  - Edit an issue
  - Get the data of a single issue
  - Lock an issue
- Release
  - Create a new release
  - Delete a new release
  - Get a new release
  - Get all releases
  - Update a new release
- Repository
  - Get the data of a single repository
  - Returns issues of a repository
- User
  - Returns the repositories of a user

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/\#templates-and-examples "Permanent link")

**ChatGPT Automatic Code Review in Gitlab MR**

by assert

[View template details](https://n8n.io/workflows/2167-chatgpt-automatic-code-review-in-gitlab-mr/)

**Save your workflows into a Gitlab repository**

by Julien DEL RIO

[View template details](https://n8n.io/workflows/2385-save-your-workflows-into-a-gitlab-repository/)

**GitLab Merge Request Review & Risk Analysis with Claude/GPT AI**

by Vishal Kumar

[View template details](https://n8n.io/workflows/3997-gitlab-merge-request-review-and-risk-analysis-with-claudegpt-ai/)

[Browse GitLab integration templates](https://n8n.io/integrations/gitlab/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/\#related-resources "Permanent link")

Refer to [GitLab's documentation](https://docs.gitlab.com/ee/api/rest/) for more information about the service.

n8n provides a trigger node for GitLab. You can find the trigger node docs [here](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.gitlabtrigger/).

## What to do if your operation isn't supported [\#](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gitlab/\#what-to-do-if-your-operation-isnt-supported "Permanent link")

If this node doesn't support the operation you want to do, you can use the [HTTP Request node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) to call the service's API.

You can use the credential you created for this service in the HTTP Request node:

1. In the HTTP Request node, select **Authentication** \> **Predefined Credential Type**.
2. Select the service you want to connect to.
3. Select your credential.

Refer to [Custom API operations](https://docs.n8n.io/integrations/custom-operations/) for more information.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Adalo credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/adalo/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/adalo/#adalo-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/adalo.md "Edit this page")

# Adalo credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/adalo/\#adalo-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Adalo](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.adalo/)

API access

You need a Team or Business plan to use the Adalo APIs.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/adalo/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/adalo/\#related-resources "Permanent link")

Refer to [Adalo's API collections documentation](https://help.adalo.com/integrations/the-adalo-api/collections) for more information about working with the service.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/adalo/\#using-api-key "Permanent link")

To configure this credential, you'll need an [Adalo](https://www.adalo.com/) account and:

- An **API Key**
- An **App ID**

To get these, create an Adalo app:

01. From the app dropdown in the top navigation, select **CREATE NEW APP**.
02. Select the App Layout type that makes sense for you and select **Next**.
    - If you're new to using the product, Adalo recommend using **Mobile Only**.
03. Select a template to get started with or select **Blank**, then select **Next**.
04. Enter an **App Name**, like `n8n integration`.
05. If applicable, select the **Team** for the app.
06. Select branding colors.
07. Select **Create**. The app editor opens.
08. In the left menu, select **Settings** (the gear cog icon).
09. Select **App Access**.
10. In the **API Key** section, select **Generate Key**.
    - If you don't have the correct plan level, you'll see a prompt to upgrade instead.
11. Copy the key and enter it as the **API Key** in your n8n credential.
12. The URL includes the **App ID** after `https://app.adalo.com/apps/`. For example, if the URL for your app is `https://app.adalo.com/apps/b78bdfcf-48dc-4550-a474-dd52c19fc371/app-settings`, `b78bdfcf-48dc-4550-a474-dd52c19fc371` is the App ID. Copy this value and enter it in your n8n credential.

Refer to [Creating an app](https://help.adalo.com/design/designing-your-app/creating-an-app) for more information on creating apps in Adalo. Refer to [The Adalo API](https://help.adalo.com/integrations/the-adalo-api) for more information on generating API keys.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Serp credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/serp/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/serp/#serp-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/serp.md "Edit this page")

# Serp credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/serp/\#serp-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [Serp](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.toolserpapi/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/serp/\#prerequisites "Permanent link")

Create a [SerpApi](https://serpapi.com/) account.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/serp/\#supported-authentication-methods "Permanent link")

- API key

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/serp/\#related-resources "Permanent link")

Refer to [Serp's API documentation](https://serpapi.com/search-api) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

## Using API key [\#](https://docs.n8n.io/integrations/builtin/credentials/serp/\#using-api-key "Permanent link")

To configure this credential, you'll need:

- An **API Key**

To get your API key:

1. Go to **Your Account >** [**API Key**](https://serpapi.com/manage-api-key).
2. Copy **Your Private API Key** and enter it as the **API Key** in your n8n credential.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>AMQP credentials | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/credentials/amqp/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/credentials/amqp/#amqp-credentials)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/credentials/amqp.md "Edit this page")

# AMQP credentials [\#](https://docs.n8n.io/integrations/builtin/credentials/amqp/\#amqp-credentials "Permanent link")

You can use these credentials to authenticate the following nodes:

- [AMQP Sender](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.amqp/)
- [AMQP Trigger](https://docs.n8n.io/integrations/builtin/trigger-nodes/n8n-nodes-base.amqptrigger/)

## Prerequisites [\#](https://docs.n8n.io/integrations/builtin/credentials/amqp/\#prerequisites "Permanent link")

Install an AMQP 1.0-compatible message broker like [ActiveMQ](https://activemq.apache.org/). Refer to [AMQP Products](https://www.amqp.org/about/examples) for a list of options.

## Supported authentication methods [\#](https://docs.n8n.io/integrations/builtin/credentials/amqp/\#supported-authentication-methods "Permanent link")

- AMQP connection

## Related resources [\#](https://docs.n8n.io/integrations/builtin/credentials/amqp/\#related-resources "Permanent link")

Advanced Message Queuing Protocol (AMQP) is an open standard application layer protocol for message-oriented middleware. The defining features of AMQP are message orientation, queuing, routing, reliability and security. Refer to the [OASIS AMQP Version 1.0 Standard](https://docs.oasis-open.org/amqp/core/v1.0/amqp-core-overview-v1.0.html) for more information.

Refer to your provider's documentation for more information about the service. Refer to [ActiveMQ's API documentation](https://activemq.apache.org/components/classic/documentation/rest) as one example.

## Using AMQP connection [\#](https://docs.n8n.io/integrations/builtin/credentials/amqp/\#using-amqp-connection "Permanent link")

To configure this credential, you'll need:

- A **Hostname**: Enter the hostname of your AMQP message broker.
- A **Port**: Enter the port number the connection should use.
- A **User**: Enter the name of the user to establish the connection as.
  - For example, the default username in ActiveMQ is `admin`.
- A **Password**: Enter the user's password.
  - For example, the default password in ActiveMQ is `admin`.
- _Optional:_ **Transport Type**: Enter either `tcp` or `tls`.

Refer to your provider's documentation for more detailed instructions.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Configure webhook URLs with reverse proxy | n8n Docs </title>
  <url>https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url/</url>
  <content>
[Skip to content](https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url/#configure-n8n-webhooks-with-reverse-proxy)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/hosting/configuration/configuration-examples/webhook-url.md "Edit this page")

# Configure n8n webhooks with reverse proxy [\#](https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url/\#configure-n8n-webhooks-with-reverse-proxy "Permanent link")

n8n creates the webhook URL by combining `N8N_PROTOCOL`, `N8N_HOST` and `N8N_PORT`. If n8n runs behind a reverse proxy, that won't work. That's because n8n runs internally on port 5678 but the reverse proxy exposes it to the web on port 443.

When running n8n behind a reverse proxy, it's important to do the following:

- set the webhook URL manually with the `WEBHOOK_URL` environment variable so that n8n can display it in the editor UI and register the correct webhook URLs with external services.
- Set the `N8N_PROXY_HOPS` environment variable to `1`.
- On the last proxy on the request path, set the following headers to pass on information about the initial request:
  - [`X-Forwarded-For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-For)
  - [`X-Forwarded-Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Host)
  - [`X-Forwarded-Proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Forwarded-Proto)

|     |     |
| --- | --- |
| ```<br>1<br>2<br>``` | ```<br>export WEBHOOK_URL=https://n8n.example.com/<br>export N8N_PROXY_HOPS=1<br>``` |

Refer to [Environment variables reference](https://docs.n8n.io/hosting/configuration/environment-variables/endpoints/) for more information on this variable.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Core nodes library | n8n Docs  </title>
  <url>https://docs.n8n.io/integrations/builtin/core-nodes/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/core-nodes/#core-nodes-library)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/core-nodes/index.md "Edit this page")

# Core nodes library [\#](https://docs.n8n.io/integrations/builtin/core-nodes/\#core-nodes-library "Permanent link")

This section provides information about n8n's core [nodes](https://docs.n8n.io/glossary/#node-n8n).

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Crypto | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/#crypto)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/core-nodes/n8n-nodes-base.crypto.md "Edit this page")

# Crypto [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#crypto "Permanent link")

Use the Crypto node to encrypt data in workflows.

## Actions [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#actions "Permanent link")

- [**Generate** a random string](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/#generate-parameters)
- [**Hash** a text or file](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/#hash-parameters) in a specified format
- [**Hmac** a text or file](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/#hmac-parameters) in a specified format
- [**Sign** a string](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/#sign-parameters) using a private key

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#node-parameters "Permanent link")

This node can be used as an AI tool

This node can be used to enhance the capabilities of an AI agent. When used in this way, many parameters can be set automatically, or with information directed by AI - find out more in the [AI tool parameters documentation](https://docs.n8n.io/advanced-ai/examples/using-the-fromai-function/).

Node parameters depend on the action you select.

### Generate parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#generate-parameters "Permanent link")

- **Property Name**: Enter the name of the property to write the random string to.
- **Type**: Select the encoding type to use to generate the string. Choose from:
  - **ASCII**
  - **BASE64**
  - **HEX**
  - **UUID**

### Hash parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#hash-parameters "Permanent link")

- **Type**: Select the hash type to use. Choose from:
  - **MD5**
  - **SHA256**
  - **SHA3-256**
  - **SHA3-384**
  - **SHA3-512**
  - **SHA385**
  - **SHA512**
- **Binary File**: Turn this parameter on if the data you want to hash is from a binary file.
  - **Value**: If you turn off **Binary File**, enter the value you want to hash.
  - **Binary Property Name**: If you turn on **Binary File**, enter the name of the binary property that contains the data you want to hash.
- **Property Name**: Enter the name of the property you want to write the hash to.
- **Encoding**: Select the encoding type to use. Choose from:
  - **BASE64**
  - **HEX**

### Hmac parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#hmac-parameters "Permanent link")

- **Binary File**: Turn this parameter on if the data you want to encrypt is from a binary file.
  - **Value**: If you turn off **Binary File**, enter the value you want to encrypt.
  - **Binary Property Name**: If you turn on **Binary File**, enter the name of the binary property that contains the data you want to encrypt.
- **Type**: Select the encryption type to use. Choose from:
  - **MD5**
  - **SHA256**
  - **SHA3-256**
  - **SHA3-384**
  - **SHA3-512**
  - **SHA385**
  - **SHA512**
- **Property Name**: Enter the name of the property you want to write the hash to.
- **Secret**: Enter the secret or secret key used for decoding.
- **Encoding**: Select the encoding type to use. Choose from:
  - **BASE64**
  - **HEX**

### Sign parameters [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#sign-parameters "Permanent link")

- **Value**: Enter the value you want to sign.
- **Property Name**: Enter the name of the property you want to write the signed value to.
- **Algorithm Name or ID**: Choose an algorithm name from the list or specify an ID using an [expression](https://docs.n8n.io/code/expressions/).
- **Encoding**: Select the encoding type to use. Choose from:
  - **BASE64**
  - **HEX**
- **Private Key**: Enter a private key to use when signing the string.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.crypto/\#templates-and-examples "Permanent link")

**Conversational Interviews with AI Agents and n8n Forms**

by Jimleuk

[View template details](https://n8n.io/workflows/2566-conversational-interviews-with-ai-agents-and-n8n-forms/)

**Analyze Crypto Markets with the AI-Powered CoinMarketCap Data Analyst**

by Don Jayamaha Jr

[View template details](https://n8n.io/workflows/3425-analyze-crypto-markets-with-the-ai-powered-coinmarketcap-data-analyst/)

**Send a ChatGPT email reply and save responses to Google Sheets**

by n8n Team

[View template details](https://n8n.io/workflows/1898-send-a-chatgpt-email-reply-and-save-responses-to-google-sheets/)

[Browse Crypto integration templates](https://n8n.io/integrations/crypto/), or [search all templates](https://n8n.io/workflows/)

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>What's a chain in AI? | n8n Docs </title>
  <url>https://docs.n8n.io/advanced-ai/examples/understand-chains/</url>
  <content>
[Skip to content](https://docs.n8n.io/advanced-ai/examples/understand-chains/#whats-a-chain-in-ai)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/advanced-ai/examples/understand-chains.md "Edit this page")

# What's a chain in AI? [\#](https://docs.n8n.io/advanced-ai/examples/understand-chains/\#whats-a-chain-in-ai "Permanent link")

[Chains](https://docs.n8n.io/glossary/#ai-chain) bring together different components of AI to create a cohesive system. They set up a sequence of calls between the components. These components can include models and [memory](https://docs.n8n.io/glossary/#ai-memory) (though note that in n8n chains can't use memory).

## Chains in n8n [\#](https://docs.n8n.io/advanced-ai/examples/understand-chains/\#chains-in-n8n "Permanent link")

n8n provides three chain nodes:

- [Basic LLM Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm/): use to interact with an LLM, without any additional components.
- [Question and Answer Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainretrievalqa/): can connect to a [vector store](https://docs.n8n.io/glossary/#ai-vector-store) using a retriever, or to an n8n workflow using the Workflow Retriever node. Use this if you want to create a workflow that supports asking questions about specific documents.
- [Summarization Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainsummarization/): takes an input and returns a summary.

There's an important difference between chains in n8n and in other tools such as LangChain: none of the chain nodes support memory. This means they can't remember previous user queries. If you use LangChain to code an AI application, you can give your application memory. In n8n, if you need your workflow to support memory, use an agent. This is essential if you want users to be able to have a natural ongoing conversation with your app.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Hugging Face Inference Model node documentation | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/#hugging-face-inference-model-node)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference.md "Edit this page")

# Hugging Face Inference Model node [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/\#hugging-face-inference-model-node "Permanent link")

Use the Hugging Face Inference Model node to use Hugging Face's models.

On this page, you'll find the node parameters for the Hugging Face Inference Model node, and links to more resources.

This node lacks tools support, so it won't work with the [AI Agent](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) node. Instead, connect it with the [Basic LLM Chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm/) node.

Credentials

You can find authentication information for this node [here](https://docs.n8n.io/integrations/builtin/credentials/huggingface/).

Parameter resolution in sub-nodes

Sub-nodes behave differently to other nodes when processing multiple items using an expression.

Most nodes, including root nodes, take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five `name` values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five `name` values, the expression `{{ $json.name }}` always resolves to the first name.

## Node parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/\#node-parameters "Permanent link")

- **Model**: Select the model to use to generate the completion.

## Node options [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/\#node-options "Permanent link")

- **Custom Inference Endpoint**: Enter a custom inference endpoint URL.
- **Frequency Penalty**: Use this option to control the chances of the model repeating itself. Higher values reduce the chance of the model repeating itself.
- **Maximum Number of Tokens**: Enter the maximum number of tokens used, which sets the completion length.
- **Presence Penalty**: Use this option to control the chances of the model talking about new topics. Higher values increase the chance of the model talking about new topics.
- **Sampling Temperature**: Use this option to control the randomness of the sampling process. A higher temperature creates more diverse sampling, but increases the risk of hallucinations.
- **Top K**: Enter the number of token choices the model uses to generate the next token.
- **Top P**: Use this option to set the probability the completion should use. Use a lower value to ignore less probable options.

## Templates and examples [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/\#templates-and-examples "Permanent link")

[Browse Hugging Face Inference Model integration templates](https://n8n.io/integrations/hugging-face-inference-model/), or [search all templates](https://n8n.io/workflows/)

## Related resources [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.lmopenhuggingfaceinference/\#related-resources "Permanent link")

Refer to [LangChains's Hugging Face Inference Model documentation](https://js.langchain.com/docs/integrations/llms/huggingface_inference/) for more information about the service.

View n8n's [Advanced AI](https://docs.n8n.io/advanced-ai/) documentation.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>

<page>
  <title>Structured Output Parser node common issues | n8n Docs </title>
  <url>https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/</url>
  <content>
[Skip to content](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/#structured-output-parser-node-common-issues)

[Edit this page](https://github.com/n8n-io/n8n-docs/edit/main/docs/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues.md "Edit this page")

# Structured Output Parser node common issues [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/\#structured-output-parser-node-common-issues "Permanent link")

Here are some common errors and issues with the [Structured Output Parser node](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/) and steps to resolve or troubleshoot them.

## Processing parameters [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/\#processing-parameters "Permanent link")

The Structured Output Parser node is a [sub-node](https://docs.n8n.io/glossary/#sub-node-n8n). Sub-nodes behave differently than other nodes when processing multiple items using expressions.

Most nodes, including [root nodes](https://docs.n8n.io/glossary/#root-node-n8n), take any number of items as input, process these items, and output the results. You can use expressions to refer to input items, and the node resolves the expression for each item in turn. For example, given an input of five name values, the expression `{{ $json.name }}` resolves to each name in turn.

In sub-nodes, the expression always resolves to the first item. For example, given an input of five name values, the expression `{{ $json.name }}` always resolves to the first name.

## Adding the structured output parser node to AI nodes [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/\#adding-the-structured-output-parser-node-to-ai-nodes "Permanent link")

You can attach output parser nodes to select [AI root nodes](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/).

To add the Structured Output Parser to a node, enable the **Require Specific Output Format** option in the AI root node you wish to format. Once the option is enabled, a new **output parser** attachment point is displayed. Click the **output parser** attachment point to add the Structured Output Parser node to the node.

## Using the structured output parser to format intermediary steps [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/\#using-the-structured-output-parser-to-format-intermediary-steps "Permanent link")

The Structured Output Parser node structures the final output from AI agents. It's not intended to structure intermediary output to pass to other AI tools or stages.

To request a specific format for intermediary output, include the response structure in the **System Message** for the **AI Agent**. The message can include either a schema or example response for the agent to use as a template for its results.

## Structuring output from agents [\#](https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.outputparserstructured/common-issues/\#structuring-output-from-agents "Permanent link")

Structured output parsing is often not reliable when working with [agents](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/).

If your workflow uses agents, n8n recommends using a separate [LLM-chain](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.chainllm/) to receive the data from the agent and parse it. This leads to better, more consistent results than parsing directly in the agent workflow.

Chat with the docs

This page was![Thumbs up](https://docs.n8n.io/_images/assets/thumb_up.png)Helpful
![Thumbs down](https://docs.n8n.io/_images/assets/thumb_down.png)Not helpful


Thanks for your feedback!


Submit


Back to top

reCAPTCHA

Recaptcha requires verification.

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)

protected by **reCAPTCHA**

[Privacy](https://www.google.com/intl/en/policies/privacy/) \- [Terms](https://www.google.com/intl/en/policies/terms/)
  </content>
</page>