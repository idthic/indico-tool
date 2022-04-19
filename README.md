# indico tool

A personal script to manipulate information extracted from indico conference web sites.

## Download slides

### Prerequisites

- `wget`, `jq`, `node`, `npm`

### Example

```bash
$ git clone git@github.com:akinomyoga/indico-tool.git
$ cd indico-tool
$ ./indico download 'https://indico.cern.ch/event/895086' ~/QM2022
```
