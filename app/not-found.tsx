import Link from "next/link";
import { PageShell } from "@/components/AppShell";
export default function NotFound() { return <PageShell locale="en"><main className="content-page"><article className="shell narrow"><p className="eyebrow">404</p><h1>This note faded out.</h1><p className="lead">The page may have moved, but the sound library is ready.</p><Link className="button button-primary" href="/sounds/">Browse pad sounds</Link></article></main></PageShell>; }
