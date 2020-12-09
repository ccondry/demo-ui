# demo-ui Change Log

Dates are in YYYY-MM-DD format


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
