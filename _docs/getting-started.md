---
title: Getting Started

description: Getting started with LDAK-KVIK
---

# Getting Started

## Downloading LDAK

LDAK can be downloaded from the [LDAK website](www.dougspeed.com/downloads2), or using these command lines in Linux:

```
---
wget www.dougspeed.com/downloads2/linuxversion
unzip zipfile
---
```

Then you can run  `ldak.out` to see a list of options. If you have done all this earlier, you can skip to the Single SNP section

### Navigation

If you want to add an external url for a parent or child, do this:

```yaml
  - title: GitHub Repository
    external_url: https://www.github.com/vsoch/mkdocs-jekyll
```

### News Posts

It might be the case that your site or group has news items that would
warrant sharing with the community, and should be available as a feed.
For this reason, you can write traditional [posts](https://jekyllrb.com/docs/posts/) in the `_posts`
folder that will parse into the site [feed]({{ site.baseurl }}/feed.xml)
The bottom of the page links the user to a post archive, where posts are organized
according to the year.

### Buttons

Buttons come in a nice array of colors. Here is the code for a basic example,
and you'd want to vary the `.btn-<tag>` to get different classes.

```html
<button class="btn btn-success">.btn-success</button>
```

<button class="btn btn-success">.btn-success</button>
<button class="btn btn-info">.btn-info</button>
<button class="btn btn-secondary">.btn-secondary</button>
<button class="btn btn-primary">.btn-primary</button>
<button class="btn btn-danger">.btn-danger</button>
<button class="btn btn-warning">.btn-warning</button>

### Badges

For news post items, it's nice to be able to tag it with something that indicates
a status, such as "warning" or "alert." For this reason, you can add badges to
the front end matter of any post page, and they will render colored by a type,
with the tag of your choice. For example, here is an example header for
a post:

```yaml
---
title:  "Two Thousand Nineteen"
date:   2019-06-28 18:52:21
categories: jekyll update
badges:
 - type: warning
   tag: warning-badge
 - type: danger
   tag: danger-badge
---
```

And here is the post preview with the rendered badges that it produces:

<span class="badge badge-warning">warning-badge</span>
<span class="badge badge-danger">danger-badge</span>

And the other badges that you can define include success, info, secondary,
and primary.

<span class="badge badge-success">success-badge</span>
<span class="badge badge-info">info-badge</span>
<span class="badge badge-secondary">secondary-badge</span>
<span class="badge badge-primary">primary-badge</span>

### Alerts

{% include alert.html type="info" title="What is an alert?" content="An alert is a box that can stand out to indicate important information. You can choose from levels success, warning, danger, info, and primary. This example is an info box, and the code for another might look like this:" %}

```
{%raw%}{% include alert.html type="info" title="Here is another!" %}{%endraw%}
```

Just for fun, here are all the types:

{% include alert.html type="warning" content="This is a warning" %}
{% include alert.html type="danger" content="This alerts danger!" %}
{% include alert.html type="success" content="This alerts success" %}
{% include alert.html type="info" content="This is useful information." %}
{% include alert.html type="primary" content="This is a primary alert" %}
{% include alert.html type="secondary" content="This is a secondary alert" %}

### Quotes

You can include block quotes to emphasize text. 

> Here is an example. Isn't this much more prominent to the user?

## Development

Initially (on OS X), you will need to setup [Brew](http://brew.sh/) which is a package manager for OS X and [Git](https://git-scm.com/). To install Brew and Git, run the following commands:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install git
```

If you are on Debian/Ubuntu, then you can easily install git with `apt-get`

```bash
apt-get update && apt-get install -y git
```

### Install Jekyll

You can also install Jekyll with brew.

```bash
$ brew install ruby
$ gem install jekyll
$ gem install bundler
$ bundle install
```

On Ubuntu I do a different method:

```bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
rbenv install 2.3.1
rbenv global 2.3.1
gem install bundler
rbenv rehash
ruby -v

# Rails
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
gem install rails -v 4.2.6
rbenv rehash

# Jekyll
gem install jekyll
gem install github-pages
gem install jekyll-sass-converter

rbenv rehash
```

### Get the code

You should first fork the repository to your GitHub organization or username,
and then clone it.

```bash
$ git clone https://github.com/<username>/mkdocs-jekyll.git docs
$ cd docs
```

You can clone the repository right to where you want to host the docs:

```bash
$ git clone https://github.com/<username>/mkdocs-jekyll.git docs
$ cd docs
```


### Serve

Depending on how you installed jekyll:

```bash
jekyll serve
# or
bundle exec jekyll serve
```


### Preview

We provide a [CircleCI](https://circleci.com/) configuration recipe that you
can use to preview your site on CircleCI before merging into master. You
should follow the instructions to [set up a project](https://circleci.com/docs/enterprise/quick-start/),
and then in the project settings be sure to enable building forked build requests,
and to cancel redundant builds. The preview will be built on CircleCI, and saved
to static files for you to browse. The only change you will need is to edit
the static files location to be the name of your repository, which is at te
bottom of the `.circleci/config.yml` file:

```yaml
      - store_artifacts:
          path: ~/repo/_site
          destination: mkdocs-jekyll
```

In the above, the destination should coincide with your repository name.
Remember that for most links, CircleCI won't honor an `index.html` file in a subfolder
(e.g., `subfolder/index.html` will not be served as `subfolder/`, so for example,
you might need to turn this:

```
https://<circleci>/0/mkdocs-jekyll/docs/getting-started/
```
into this:

```
https://<circleci>/0/mkdocs-jekyll/docs/getting-started/index.html
```

## Customization

#### config.yml

To edit configuration values, customize the [_config.yml](_config.yml).
Most are documented there, and please [open an issue](https://www.github.com/{{ site.github_user }}/{{ site.github_user }}/issues) if you have questions.

#### Adding pages

To add pages, write them into the [pages](pages) folder. 
You define urls based on the `permalink` attribute in your pages,
and then add them to the navigation by adding to the content of [_data/toc.yml](_data/toc.yml).

#### Tags

If you include tags on a page, by default they will link to the [tags page]({{ site.url }}{{ site.baseurl }}/tags) on the site. However, if you define a `tag_search_endpoint` url in your configuration file, by clicking
the tag, the user will be taken to this page to search for it. As an example,
we define the current search endpoint to be Ask Cyberinfrastructure, and
page tags link to a search on it:

```yaml
tag_search_endpoint: https://ask.cyberinfrastructure.org/search?q=
tag_color: danger # danger, success, warning, primary, secondary, info
```

Note that you can also choose a color! The tags appear at the top of the page,
as they do on this page. The tags should be defined like this in the front end
matter:

```yaml
tags: 
 - jekyll
 - github
```

They are appended to the first h1 block, so generally your pages should have a header.
If you comment out this variable, then each of your tags will link to it's appropriate
spot on the tags page linked above.

```yaml
#tag_search_endpoint: https://ask.cyberinfrastructure.org/search?q=
tag_color: primary # danger, success, warning, primary, info, secondary
```

