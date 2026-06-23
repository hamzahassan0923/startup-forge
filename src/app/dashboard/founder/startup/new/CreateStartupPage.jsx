'use client';

import React, { useState } from 'react';
import { 
    Form, 
    Fieldset, 
    TextField, 
    Label, 
    Input, 
    TextArea, 
    Select, 
    ListBox, 
    Button, 
    FieldError,
    Spinner
} from "@heroui/react";
import { Globe } from "@gravity-ui/icons";
import { ArrowUpCircle } from 'lucide-react';
import { createStartup } from '@/lib/actions/startup';

export default function CreateStartupPage({ startupData }) {
    const [errors, setErrors] = useState({});
    const [logoUrl, setLogoUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // Style layout variables matching your layout guidelines
    const textInputClass = "w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black";
    const textAreaClass = "w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none";
    const selectBoxClass = "w-full flex flex-col gap-1";
    const triggerClasses = "w-full flex items-center justify-between border border-zinc-200 rounded-lg px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black h-10 cursor-pointer";
    const popoverClasses = "bg-white border border-zinc-100 rounded-lg shadow-lg p-1 min-w-[200px] z-50";
    const listItemClasses = "px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 rounded-md cursor-pointer outline-none data-[focused=true]:bg-zinc-100";

    // Client side asynchronous file uploading helper directly to ImgBB free tier API
    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace with your real client-side ImgBB API Key or environment variable config
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (result.success) {
                setLogoUrl(result.data.url); // Saves actual hosted secure absolute link layout URL directly
                setErrors(prev => ({ ...prev, logo: null }));
            } else {
                setErrors(prev => ({ ...prev, logo: "Image upload failed. Try again." }));
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, logo: "Error connecting to cloud image storage provider." }));
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Client side simple presence validation
        const currentErrors = {};
        if (!data.startupName) currentErrors.startupName = "Startup name is required";
        if (!logoUrl) currentErrors.logo = "Please upload a corporate brand image logo";
        if (!data.industry) currentErrors.industry = "Industry selector category is required";
        if (!data.description) currentErrors.description = "Please describe your vision portfolio";
        if (!data.fundingStage) currentErrors.fundingStage = "Select current funding level validation";
        if (!data.founderEmail) currentErrors.founderEmail = "Primary operational email point is required";

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        // Complete formatted DB-ready object package layout payload structure
        const submissionPayload = {
            startupName: data.startupName,
            logo: logoUrl, // Valid absolute cloud static URL 
            industry: data.industry,
            description: data.description,
            fundingStage: data.fundingStage,
            founderEmail: data.founderEmail,
            status: "pending",
            startupId: startupData.id 
        };

        console.log("Database Form Payload Ready:", submissionPayload);
        const payload = await createStartup(submissionPayload);

        if(payload.success) {
            alert("Startup created successfully! Awaiting verification.");
            // Optionally reset form or redirect to another page
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 my-10 bg-white border border-zinc-100 rounded-xl shadow-sm">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-zinc-900">Create Startup</h1>
                <p className="text-sm text-zinc-500">Register your workspace details here to forge opportunities.</p>
            </div>

            <Form onSubmit={handleSubmit} className="space-y-8" validationErrors={errors} validationBehavior='aria'>
                
                {/* SECTION 1: Base Identity Details */}
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-lg font-medium text-zinc-800 border-b border-zinc-100 w-full pb-2 mb-2">
                        Startup Profile Identity
                    </legend>

                    {/* Startup Name Field */}
                    <div className="grid grid-cols-1 gap-6">
                        <TextField name="startupName" tyranny isInvalid={!!errors.startupName} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-600 font-medium text-sm">Startup Name</Label>
                            <Input placeholder="e.g. HireLoop Tech, Alpha Logistics" className={textInputClass} />
                            {errors.startupName && <FieldError className="text-xs text-danger mt-1">{errors.startupName}</FieldError>}
                        </TextField>
                    </div>

                    {/* Custom Integrated Uploading Trigger File Block */}
                    <div className="flex flex-col gap-2 w-full">
                        <Label className="text-zinc-600 font-medium text-sm">Logo Brand Asset</Label>
                        <div className="flex items-center gap-4 border border-dashed border-zinc-200 rounded-lg p-4 bg-zinc-50/50">
                            <label className="flex items-center gap-2 bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors shadow-sm">
                                <ArrowUpCircle width={16} height={16} className="text-zinc-500" />
                                Choose Logo File
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleLogoUpload} 
                                    className="hidden" 
                                />
                            </label>

                            <div className="flex-1 text-xs text-zinc-500">
                                {isUploading ? (
                                    <div className="flex items-center gap-2 text-zinc-600">
                                        <Spinner size="sm" color="current" />
                                        Uploading assets safely to image servers...
                                    </div>
                                ) : logoUrl ? (
                                    <div className="flex items-center gap-2">
                                        <img src={logoUrl} alt="Preview" className="w-8 h-8 rounded-md object-contain border bg-white" />
                                        <span className="text-success-600 font-medium truncate max-w-[240px]">Logo attached successfully!</span>
                                    </div>
                                ) : (
                                    <span>Supports PNG, JPG or WEBP formats. Managed via ImgBB CDN.</span>
                                )}
                            </div>
                        </div>
                        {errors.logo && <span className="text-xs text-danger mt-1 block">{errors.logo}</span>}
                    </div>
                </Fieldset>

                {/* SECTION 2: Venture Core Data */}
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-lg font-medium text-zinc-800 border-b border-zinc-100 w-full pb-2 mb-2">
                        Venture Specifications
                    </legend>

                    {/* Industry Category Selector */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select className={selectBoxClass} name="industry" isInvalid={!!errors.industry}>
                            <Label className="text-zinc-600 font-medium text-sm mb-1 block">Industry Field Focus</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-zinc-900 placeholder:text-zinc-400" />
                                <Select.Indicator />
                            </Select.Trigger>
                            {errors.industry && <span className="text-xs text-danger mt-1">{errors.industry}</span>}
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="saas" className={listItemClasses} textValue="SaaS / Software">SaaS / Software</ListBox.Item>
                                    <ListBox.Item id="fintech" className={listItemClasses} textValue="Fintech Solutions">Fintech Solutions</ListBox.Item>
                                    <ListBox.Item id="ai-ml" className={listItemClasses} textValue="Artificial Intelligence">Artificial Intelligence</ListBox.Item>
                                    <ListBox.Item id="edtech" className={listItemClasses} textValue="EdTech Platforms">EdTech Platforms</ListBox.Item>
                                    <ListBox.Item id="ecommerce" className={listItemClasses} textValue="E-Commerce & Retail">E-Commerce & Retail</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        {/* Funding Stage Selector */}
                        <Select className={selectBoxClass} name="fundingStage" isInvalid={!!errors.fundingStage}>
                            <Label className="text-zinc-600 font-medium text-sm mb-1 block">Funding Stage Status</Label>
                            <Select.Trigger className={triggerClasses}>
                                <Select.Value className="text-zinc-900 placeholder:text-zinc-400" />
                                <Select.Indicator />
                            </Select.Trigger>
                            {errors.fundingStage && <span className="text-xs text-danger mt-1">{errors.fundingStage}</span>}
                            <Select.Popover className={popoverClasses}>
                                <ListBox className="outline-none">
                                    <ListBox.Item id="bootstrapped" className={listItemClasses} textValue="Bootstrapped">Bootstrapped</ListBox.Item>
                                    <ListBox.Item id="pre-seed" className={listItemClasses} textValue="Pre-Seed Venture">Pre-Seed Venture</ListBox.Item>
                                    <ListBox.Item id="seed" className={listItemClasses} textValue="Seed Stage Asset">Seed Stage Asset</ListBox.Item>
                                    <ListBox.Item id="series-a" className={listItemClasses} textValue="Series A+ Scaling">Series A+ Scaling</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* Business Pitch Core Description */}
                    <div className="grid grid-cols-1 gap-6">
                        <TextField name="description" isInvalid={!!errors.description} className="flex flex-col gap-1 w-full">
                            <Label className="text-zinc-600 font-medium text-sm">Venture Summary & Description</Label>
                            <TextArea
                                placeholder="Describe your corporate ecosystem framework, goals, and culture milestones..."
                                rows={4}
                                className={textAreaClass}
                            />
                            {errors.description && <FieldError className="text-xs text-danger mt-1">{errors.description}</FieldError>}
                        </TextField>
                    </div>
                </Fieldset>

                {/* SECTION 3: Operations & Verification Contact */}
                <Fieldset className="space-y-6 w-full">
                    <legend className="text-lg font-medium text-zinc-800 border-b border-zinc-100 w-full pb-2 mb-2">
                        Operational Communications
                    </legend>

                    <div className="grid grid-cols-1 gap-6">
                        <TextField name="founderEmail" type="email" isInvalid={!!errors.founderEmail} className="flex flex-col gap-1 w-full relative">
                            <Label className="text-zinc-600 font-medium text-sm">Founder Corporate Email</Label>
                            <div className="relative flex items-center">
                                <Globe className="absolute left-3 text-zinc-400 pointer-events-none z-10" width={16} height={16} />
                                <Input
                                    placeholder="e.g. founder@company.com"
                                    className={`${textInputClass} pl-10`}
                                />
                            </div>
                            {errors.founderEmail && <FieldError className="text-xs text-danger mt-1">{errors.founderEmail}</FieldError>}
                        </TextField>
                    </div>
                </Fieldset>

                {/* Submit Action Bars */}
                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100 w-full">
                    <Button
                        type="button"
                        variant="bordered"
                        className="border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg px-6 font-medium h-11"
                    >
                        Discard Setup
                    </Button>
                    <Button
                        type="submit"
                        disabled={isUploading}
                        className="bg-black text-white font-semibold hover:bg-zinc-800 disabled:bg-zinc-400 rounded-lg px-6 transition-colors h-11"
                    >
                        Create Venture Forge
                    </Button>
                </div>
            </Form>
        </div>
    );
}