---
layout: ../../layouts/MarkdownLayout.astro
title: Résumé
description: >-
  Résumé for Yohannes Berhane — backend engineer with experience across Python ecosystems, Scala (Cats ecosystem), GCP/AWS, and pragmatic full-stack touches.
---

# Yohannes A. Berhane

Reach me at **y.berhane56@gmail.com** · [**LinkedIn**](https://www.linkedin.com/in/yohannes-berhane/) · [**GitHub**](https://github.com/yohannes15)

---

## Summary

Backend software engineer focusing on scalable services, pragmatic architecture, and data-heavy backends. Principal delivery experience in **Python** (Django, Flask, FastAPI), with deliberate depth building in **Scala** (**Cats**, **Cats Effect**, **Http4s**) and pragmatic exposure across ecosystems.

---

## Experience

### Senior Software Engineer — Gen _(Oct 2025 – May 2026 · New York, NY · Hybrid)_

- **Infrastructure migration**: Led in-sourcing and migration of an outsourced Django application (~700k requests/day) from EC2 to ECS and RDS to Aurora; introduced Terraform-based IaC to reduce manual churn and stabilize operations.
- **Backend engineering**: Internal rule/decision tooling in **Scala** / **Cats** / **Http4s**, paired with maintaining high-throughput **Django REST** integrations across partners.
- **Data pipelines**: Designed a Snowflake → S3 → Lambda → SQS ingestion path supporting multi-million-record monthly refresh workloads.
- **Platform support**: Assisted container-backed execution workflows for externally supplied decision logic.

### Senior Software Engineer — OptiFunder _(Sep 2021 – Oct 2025 · promoted May 2023 · Remote, NY)_

- **Full-stack product delivery**: Owned core Django / Flask workloads supporting a sizable share of US independent mortgage LOS workflows; supplemented with HTMX, Alpine.js, React, and Tailwind where it bought velocity.
- **Architecture**: Moved monolith hotspots toward clearer service seams; leaned on asyncio, parallelism, Google Cloud Tasks / Jobs for throughput.
- **APIs**: DRF-heavy surfaces with pragmatic API design and operational guardrails baked in—not just “routes exist”.
- **Databases**: Re-shaped legacy relational models to cut hot-path query cost dramatically (measurable double-digit/low-triple-digit improvements on worst offenders).
- **Cloud & infra**: GCP + Terraform deployments; repeatable environments over tribal knowledge.
- **Quality**: Raised the bar via Pytest culture and pragmatic review rituals.
- **Leadership**: Mentored a small rotating team—reviews, roadmap translation, escalation handling.

### Software Engineer — Trimble Maps _(Oct 2020 – Oct 2021 · Princeton, NJ)_

- .NET Core services in Dockerized deployments on AWS.
- Automated CI/CD (Jenkins, Python, Chef) cutting deployment-cycle time materially.
- Blue/green modernization for REST-ish services with meaningful external consumers.
- NUnit/XUnit coverage discipline at healthy baseline (≈85% on targeted suites).
- SQL Server optimization work improving latency on transaction-heavy workloads.

---

## Open source

### Django‑Storages — signed URLs via IAM API

Collaborated upstream on Google Cloud-backed signed URL generation routed through IAM-style APIs _(see [Pull Request](https://github.com/jschneier/django-storages/pull/1427))._

---

## Technical skills

**Languages**: Python _(primary)_ · Scala · JavaScript · C# · SQL

**Python ecosystem**: Django · Flask · FastAPI · Django REST Framework · Celery · Pytest

**Scala ecosystem**: Cats · Cats Effect · Http4s

**Frontend (selective touches)**: React · HTMX · Alpine.js · Tailwind

**Cloud / infra**: AWS (EC2 · ECS · S3 · Lambda · RDS/Aurora) · GCP · Terraform · Docker · GitHub Actions

**Databases**: PostgreSQL · MySQL · SQL Server · Redis · DynamoDB · Snowflake

---

## Education

### St. John’s University · B.S., Computer Science

Queens, NY · Aug 2016 – May 2020
