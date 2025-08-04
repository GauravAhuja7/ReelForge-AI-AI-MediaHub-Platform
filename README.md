# FeeltoReel AI

> Because typing is easier than talking, but sometimes you need the talking part too.

Yet another text-to-video/audio generator, except this one actually works and doesn't make you want to throw your laptop out the window.

## What does this thing do?

Basically, you throw some text at it and it spits out videos or audio. I got tired of paying $50/month for services that take 20 minutes to generate a 30-second clip, so I built this.

**Features that actually work:**
- Text → Video (uses some fancy AI models)
- Text → Audio (surprisingly decent quality)
- User auth (because apparently people want accounts)
- Payment stuff with Razorpay (gotta pay the bills somehow)
- Dashboard to manage your creations
- Responsive design (works on your phone, shocking I know)

**The cool stuff:**
- Built with Next.js 15 (bleeding edge, living dangerously)
- Three.js animations because I wanted it to look fancy
- MongoDB because I like JSON and hate SQL joins
- Tailwind because writing CSS is for masochists

## Tech Stack

**Frontend:**
- Next.js 15 (App Router because I hate myself)
- React 19 (RC, probably will break something)
- Three.js for the spinny graphics
- Tailwind + DaisyUI (best combo, fight me)
- Framer Motion for smooth animations

**Backend:**
- Next.js API routes (serverless is the future)
- MongoDB + Mongoose (NoSQL gang)
- NextAuth.js (auth is hard, let someone else handle it)
- bcrypt for passwords (obviously)

**External APIs:**
- Razorpay (Indian payment gateway, surprisingly good)
- Some AI APIs I can't mention (NDAs are fun)
- AWS for file storage (Jeff Bezos needs more money)

## Getting this thing running

### You'll need:
- Node.js 18+ (16 might work but why risk it)
- A MongoDB instance (local or cloud, I don't judge)
- Razorpay account (for payments)
- Coffee (mandatory)

### Setup:

```bash
# Clone it
git clone <this-repo>
cd feeltoreel

# Install the chaos
npm install

# Copy the env file and fill it out
cp .env.example .env.local
```

Your `.env.local` should look like this:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/feeltoreel
# or use MongoDB Atlas if you're fancy

# NextAuth (generate a random string, I used my cat's name)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key

# Razorpay (get these from their dashboard)
RAZORPAY_KEY_ID=rzp_test_whatever
RAZORPAY_KEY_SECRET=dont_commit_this_to_git

# Email (if you want email notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# AI API keys go here
# (ask me on Discord if you need test keys)
```

Run it:
```bash
npm run dev
```

Go to `localhost:3000` and hope it works.

## Project Structure

```
src/
├── app/                 # Next.js 13+ App Router magic
│   ├── api/            # Backend endpoints
│   ├── audio/          # Audio generation pages
│   ├── video/          # Video generation pages  
│   ├── dashboard/      # User stuff
│   ├── (auth)/         # Login/register pages
│   └── page.js         # Landing page
├── components/         # React components
├── lib/               # Utility functions
├── models/            # MongoDB schemas
└── middleware.js      # Auth middleware

public/
├── background-video.mp4  # Hero video (7MB, probably should optimize)
└── feel2reel.svg        # Logo I made in 5 minutes
```

## How to use this

1. Sign up (required, sorry)
2. Pick text-to-video or text-to-audio
3. Type your text
4. Hit generate and wait (usually 30-60 seconds)
5. Download your creation
6. Profit? (still working on this part)

## Development

```bash
npm run dev      # Start dev server (with Turbopack because it's fast)
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Find all my terrible code choices
```

## Contributing

Found a bug? Cool, open an issue.
Want to add a feature? Even cooler, open a PR.
Want to completely rewrite everything? Please don't.

## Known Issues

- Video generation sometimes fails on the first try (just retry)
- Audio quality varies depending on input text length
- The 3D animations are probably overkill but they look cool
- Database queries could be optimized (TODO: actually do this)
- Error handling is... minimal

## FAQ

**Q: Why another AI content generator?**
A: Because the existing ones are either too expensive or suck.

**Q: Is this production ready?**
A: Define "production ready." It works, mostly.

**Q: Can I self-host this?**
A: Yeah, that's literally the point.

**Q: Why Next.js?**
A: React Server Components are actually pretty nice once you get over the learning curve.

*"It works on my machine" - Every developer ever*
