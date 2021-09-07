# demo-ui Change Log

Dates are in YYYY-MM-DD format


# 2021.9.7-2

### Features
* **Site:** Add SSO redirect URL to the footer for troubleshooting.


# 2021.9.7-1

### Features
* **Site:** Add site footer with version info for the UI and APIs.


# 2021.9.7

### Fixes
* **SSO:** Fix SSO login for scheduled demos when using Chrome.


# 2021.9.3

### Fixes
* **Login:** Remove username/password login option (SSO only).
* **SSO:** Fix SSO login for PCCE scheduled demos.


# 2021.7.27-1

### Fixes
* **Dependencies:** Re-add Bulma dependency that is actually necessary.


# 2021.7.27

### Fixes
* **Dependencies:** Updated Buefy dependency from 0.9.4 to 0.9.8 and removed
explicit Bulma dependency that is not necessary.


# 2021.4.28-1

### Fixes
* **SSO:** fix SSO login again.


# 2021.4.28

### Fixes
* **SSO:** fix SSO/OAUTH2 redirect URI mismatch.


# 2021.1.25

### Bug Fixes

* **Vertical Selection:** fix issue where vertical selection choice was not
updating properly after being changed


# 2020.12.9

### Bug Fixes

* **Upstream:** fix submit button


# 2020.11.30

### Features

* **Vertical Selection:** add toolbox login support for selecting one's own
verticals
* **CVA:** demos with CVA feature enabled will install vertical CVA
configuration into PCCE when selecting a vertical with custom gcpProjectId


# 1.4.0 (2020-10-02)

### Features

* **Multichannel:** add support for Webex multichannel option


# 1.3.1 (2020-10-02)

### Bug Fixes

* **Build Script:** rebuild node-sass during update.sh script


# 1.3.0 (2020-10-01)

### Bug Fixes

* **Vertical Owner:** fix vertical owner input box losing focus after being
clicked


### Features

* **Endpoints:** define REST endpoints in state instead of getting them from
demo-api

* **Dependencies:** update buefy, bulma, node-sass dependencies to the latest
versions. Remove wysiwyg.css and vue-bulma-*.

* **Base Demo Configs:** get demo base config from demo-api, and refer to demo
base config for multichannel options.

* **Save Demo Config:** automatically save demo config when changing vertical or
multichannel selection.


# 1.2.1 (2020-09-30)

### Bug Fixes

* **Webex CCE v1 and v2:** fix version check for multichannel options
