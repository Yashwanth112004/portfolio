"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audio } from "@/utils/audio";
import { BookOpen, Cloud, ArrowUpRight, Terminal as TermIcon, FileText } from "lucide-react";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  synopsis: string;
  content: string;
}

export default function Blog() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "Host Static Websites on AWS S3 & CloudFront",
      category: "CLOUD ARCHITECTURE",
      date: "04-22-2024",
      synopsis: "Step-by-step breakdown on deploying high-performance static websites globally using AWS S3 bucket policies and CloudFront CDN caching distributions.",
      content: `# Hosting on AWS S3 & CloudFront

In this manual, we establish a secure, globally cached distribution framework:

1. **S3 Bucket Configuration**: Create bucket with public-read permissions disabled, utilizing Origin Access Control (OAC).
2. **CloudFront Edge Distribution**: Attach S3 origin to CloudFront. Force HTTPS redirection.
3. **SSL/TLS Peering**: Provision SSL cert via ACM in us-east-1 and attach to CloudFront.
4. **Route53 DNS Record**: Map alias record pointing to CloudFront distributions.`
    },
    {
      id: 2,
      title: "Serverless Microservices using API Gateway & Lambda",
      category: "SERVERLESS ENGINEERING",
      date: "05-10-2024",
      synopsis: "Analyzing cost-efficient microservice execution structures using serverless API Route handlers, IAM credential restrictions, and AWS Lambda function scaling.",
      content: `# Serverless APIs with Lambda & Gateway

Deploying elastic compute endpoints with zero idling runtime costs:

1. **Lambda Functions**: Construct Python-based handlers. Package libraries into layer dependencies.
2. **API Gateway Config**: Set up proxy resources. Map request payloads to Lambda context variables.
3. **Cognito / Custom Authorizers**: Bind JWT validation layers to endpoints.
4. **CloudWatch Metrics**: Capture performance thresholds and execution latencies.`
    },
    {
      id: 3,
      title: "CI/CD Deployment Pipelines with GitHub & AWS CodePipeline",
      category: "DEVOPS topOLOGY",
      date: "05-18-2024",
      synopsis: "Automating cloud code compilation. Triggers instant build builds and deployment updates on S3 hosts when master git commits push.",
      content: `# CI/CD Pipelines

Automated deployment automation patterns for modern micro-frontends:

1. **GitHub Webhook Listeners**: Establish token handshakes.
2. **AWS CodeBuild Config**: Define buildspec.yml parameters. Install nodes, run compile commands.
3. **Target Deployments**: Output compiled bundles directly to target S3 storage.
4. **Invalidate CloudFront Cache**: Trigger AWS CLI commands to purge Edge caches.`
    }
  ];

  const handleArticleClick = (id: number) => {
    setSelectedArticleId(id);
    audio.playSuccess();
  };

  const handleBackToCatalog = () => {
    setSelectedArticleId(null);
    audio.playClick();
  };

  const handleOutboundClick = () => {
    audio.playClick();
  };

  const currentArticle = articles.find((a) => a.id === selectedArticleId);

  return (
    <section id="blog" className="py-24 px-4 md:px-8 border-b border-slate-900 bg-transparent scroll-mt-12">
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-xs font-mono-term text-[#00f0ff] tracking-[0.25em] uppercase mb-2">
              // EXTERNAL AWS static LOGS
            </h2>
            <h3 className="text-3xl font-display font-black text-white tracking-wide flex items-center gap-3">
              CLOUD ENGINEERING BLOGS
            </h3>
          </div>

          <a
            href="https://static-website-11187.s3.us-east-1.amazonaws.com/index.html"
            target="_blank"
            rel="noreferrer"
            onClick={handleOutboundClick}
            className="px-5 py-3 border border-[#ffb000] bg-[#ffb000]/10 hover:bg-[#ffb000]/25 text-white font-display tracking-widest text-[11px] rounded transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Cloud className="w-4 h-4 text-[#ffb000]" />
            [ EXPLORE_LIVE_S3_BLOG ]
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <div className="border border-slate-800 bg-[#0a0a0f]/90 p-6 md:p-8 rounded-lg glass-panel relative min-h-[380px]">
          
          <AnimatePresence mode="wait">
            {!selectedArticleId ? (
              // Article Catalog view
              <motion.div
                key="catalog"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-slate-850 text-xs font-mono-term text-slate-500">
                  <TermIcon className="w-4 h-4 text-[#00f0ff]" />
                  <span>S3_ARCHIVE_CATALOG_LOG</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {articles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => handleArticleClick(art.id)}
                      className="border border-slate-900 bg-black/40 p-5 rounded hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group h-64 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                    >
                      <div>
                        <div className="text-[9px] font-mono-term text-[#00f0ff] font-bold uppercase tracking-wider mb-2">
                          {art.category}
                        </div>
                        <h4 className="text-sm font-display font-bold text-white uppercase leading-5 tracking-wide mb-3 group-hover:text-[#00f0ff] transition-colors">
                          {art.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-sans leading-relaxed line-clamp-3">
                          {art.synopsis}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-900 pt-3 text-[9px] font-mono-term text-slate-500">
                        <span>DATE: {art.date}</span>
                        <span className="text-[#00f0ff] group-hover:underline">[ SCAN_LOG ]</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              // Embedded Diagnostic Reader view
              <motion.div
                key="reader"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center pb-3 border-b border-slate-850">
                  <div className="flex items-center gap-2 text-xs font-mono-term text-[#00f0ff]">
                    <FileText className="w-4 h-4 text-[#00f0ff]" />
                    <span>READING: YP_BLOG_{currentArticle?.id}.LOG</span>
                  </div>
                  <button
                    onClick={handleBackToCatalog}
                    className="text-xs font-mono-term text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    [ RETURN TO INDEX ]
                  </button>
                </div>

                <div className="font-mono-term bg-black/80 border border-slate-950 p-5 rounded-md text-xs leading-relaxed max-h-[350px] overflow-y-auto scrollbar-thin select-text">
                  <div className="text-[10px] text-slate-500 mb-4 pb-2 border-b border-slate-900 flex justify-between">
                    <span>SECTOR: {currentArticle?.category}</span>
                    <span>TIMESTAMP: {currentArticle?.date}</span>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-slate-300 text-[13px] leading-6 space-y-4">
                    {currentArticle?.content}
                  </pre>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-slate-850">
                  <button
                    onClick={handleBackToCatalog}
                    className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white text-xs font-mono-term rounded cursor-pointer"
                  >
                    [ BACK_TO_LOGS ]
                  </button>
                  <a
                    href="https://static-website-11187.s3.us-east-1.amazonaws.com/index.html"
                    target="_blank"
                    rel="noreferrer"
                    onClick={handleOutboundClick}
                    className="px-4 py-2 border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff]/25 text-[#00f0ff] hover:text-white text-xs font-mono-term rounded flex items-center gap-2 cursor-pointer"
                  >
                    [ READ_FULL_VERSION_IN_AWS ]
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
