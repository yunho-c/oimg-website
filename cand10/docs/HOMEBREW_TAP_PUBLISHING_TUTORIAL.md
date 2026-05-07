# Homebrew Tap Publishing Tutorial

This guide explains how to publish OIMG through a personal Homebrew tap first.

The target install UX is:

```sh
brew install --cask yunho-c/tap/oimg
```

Users can also tap the repo first:

```sh
brew tap yunho-c/tap
brew install --cask oimg
```

Use plain `brew install --cask oimg` only if OIMG is later accepted into the official `homebrew/cask` tap.

## 1. Create The Tap Repo

Create a new GitHub repository:

```txt
yunho-c/homebrew-tap
```

Clone it locally:

```sh
cd ~/GitHub
git clone git@github.com:yunho-c/homebrew-tap.git
cd homebrew-tap
```

Create the cask directory:

```sh
mkdir -p Casks
```

Homebrew's naming convention maps `yunho-c/homebrew-tap` to the tap name `yunho-c/tap`.

## 2. Confirm The Release Asset

For OIMG `v0.1.1`, the macOS release asset is:

```txt
https://github.com/yunho-c/oimg/releases/download/v0.1.1/OIMG-0.1.1.dmg
```

Download it and compute the SHA-256 checksum:

```sh
curl -L -o /tmp/OIMG-0.1.1.dmg \
  https://github.com/yunho-c/oimg/releases/download/v0.1.1/OIMG-0.1.1.dmg

shasum -a 256 /tmp/OIMG-0.1.1.dmg
```

Copy the checksum value. Homebrew casks require a checksum for versioned downloads.

## 3. Create The Cask

Create:

```txt
Casks/oimg.rb
```

Add:

```ruby
cask "oimg" do
  version "0.1.1"
  sha256 "PASTE_SHA256_HERE"

  url "https://github.com/yunho-c/oimg/releases/download/v#{version}/OIMG-#{version}.dmg"
  name "OIMG"
  desc "Image compression app"
  homepage "https://oimg.org/"

  app "OIMG.app"
end
```

If the app bundle inside the DMG is named differently, mount the DMG and check:

```sh
hdiutil attach /tmp/OIMG-0.1.1.dmg
ls /Volumes
```

Then adjust:

```ruby
app "OIMG.app"
```

## 4. Test Locally

From the tap repo:

```sh
brew tap yunho-c/tap ~/GitHub/homebrew-tap
brew install --cask yunho-c/tap/oimg
```

Homebrew expects casks to be installed from a registered tap. Installing directly from `./Casks/oimg.rb` can be rejected even when the file is valid.

Confirm that OIMG appears in `/Applications` and launches.

Then test uninstall:

```sh
brew uninstall --cask oimg
```

Run audit and style checks:

```sh
brew audit --new --cask yunho-c/tap/oimg
brew style --fix yunho-c/tap/oimg
```

Fix anything reported before publishing the tap.

## 5. Commit And Push

```sh
git add Casks/oimg.rb
git commit -m "Add OIMG cask"
git push origin main
```

After this, users can install with:

```sh
brew install --cask yunho-c/tap/oimg
```

Or:

```sh
brew tap yunho-c/tap
brew install --cask oimg
```

## 6. Update The Website CLI Text

Once the tap is live, update the macOS CLI install command on the website from:

```sh
brew install --cask oimg
```

to:

```sh
brew install --cask yunho-c/tap/oimg
```

Keep this tap-qualified command until OIMG is accepted into official `homebrew/cask`.

## 7. Future Release Update Flow

For each new OIMG release:

1. Publish a GitHub Release with `OIMG-x.y.z.dmg`.
2. Download the DMG and compute SHA-256.
3. Update `version` and `sha256` in `Casks/oimg.rb`.
4. Run install, uninstall, audit, and style checks.
5. Commit and push.

Later, this can be automated from the main `oimg` release workflow by opening a pull request to `yunho-c/homebrew-tap` whenever a new macOS DMG is published.

## Official Homebrew Cask Later

The personal tap can be published immediately. Official `homebrew/cask` has stricter acceptance expectations, including app notability and clean Gatekeeper behavior. Signing and notarizing the macOS app/DMG will make both the user experience and any future official cask submission stronger.

References:

- https://docs.brew.sh/How-to-Create-and-Maintain-a-Tap
- https://docs.brew.sh/Cask-Cookbook
- https://docs.brew.sh/Adding-Software-to-Homebrew
- https://docs.brew.sh/Acceptable-Casks
