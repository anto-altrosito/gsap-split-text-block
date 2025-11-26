import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.css';
import './editor.css';

registerBlockType('gsap-split/animated-content', {
    title: __('Contenuto Animato GSAP', 'gsap-split-block'),
    description: __('Wrapper per animazioni split text con GSAP', 'gsap-split-block'),
    category: 'design',
    icon: 'editor-textcolor',
    attributes: {
        splitType: {
            type: 'string',
            default: 'chars'
        },
        animationType: {
            type: 'string',
            default: 'fadeUp'
        },
        duration: {
            type: 'number',
            default: 0.8
        },
        stagger: {
            type: 'number',
            default: 0.03
        },
        delay: {
            type: 'number',
            default: 0
        },
        useScrollTrigger: {
            type: 'boolean',
            default: true
        },
        triggerStart: {
            type: 'string',
            default: 'top 80%'
        }
    },

    edit: ({ attributes, setAttributes }) => {
        const {
            splitType,
            animationType,
            duration,
            stagger,
            delay,
            useScrollTrigger,
            triggerStart
        } = attributes;

        const blockProps = useBlockProps({
            className: 'gsap-split-animated-wrapper'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Impostazioni Split', 'gsap-split-block')} initialOpen={true}>
                        <SelectControl
                            label={__('Tipo di Split', 'gsap-split-block')}
                            value={splitType}
                            options={[
                                { label: __('Caratteri', 'gsap-split-block'), value: 'chars' },
                                { label: __('Parole', 'gsap-split-block'), value: 'words' },
                                { label: __('Righe', 'gsap-split-block'), value: 'lines' },
                                { label: __('Caratteri + Parole', 'gsap-split-block'), value: 'chars,words' }
                            ]}
                            onChange={(value) => setAttributes({ splitType: value })}
                        />

                        <SelectControl
                            label={__('Tipo Animazione', 'gsap-split-block')}
                            value={animationType}
                            options={[
                                { label: __('Fade Up', 'gsap-split-block'), value: 'fadeUp' },
                                { label: __('Fade In', 'gsap-split-block'), value: 'fadeIn' },
                                { label: __('Slide Right', 'gsap-split-block'), value: 'slideRight' },
                                { label: __('Slide Left', 'gsap-split-block'), value: 'slideLeft' },
                                { label: __('Scale Up', 'gsap-split-block'), value: 'scaleUp' },
                                { label: __('Rotate In', 'gsap-split-block'), value: 'rotateIn' },
                                // nuove animazioni
                                { label: __('Blur In', 'gsap-split-block'), value: 'blurIn' },
                                { label: __('Flip Y', 'gsap-split-block'), value: 'flipY' },
                                { label: __('Skew Up', 'gsap-split-block'), value: 'skewUp' },
                                { label: __('Bounce Up', 'gsap-split-block'), value: 'bounceUp' }
                            ]}
                            onChange={(value) => setAttributes({ animationType: value })}
                        />
                    </PanelBody>

                    <PanelBody title={__('Timing', 'gsap-split-block')} initialOpen={false}>
                        <RangeControl
                            label={__('Durata (secondi)', 'gsap-split-block')}
                            value={duration}
                            onChange={(value) => setAttributes({ duration: value })}
                            min={0.1}
                            max={3}
                            step={0.1}
                        />

                        <RangeControl
                            label={__('Stagger (secondi)', 'gsap-split-block')}
                            value={stagger}
                            onChange={(value) => setAttributes({ stagger: value })}
                            min={0}
                            max={0.2}
                            step={0.01}
                        />

                        <RangeControl
                            label={__('Delay (secondi)', 'gsap-split-block')}
                            value={delay}
                            onChange={(value) => setAttributes({ delay: value })}
                            min={0}
                            max={3}
                            step={0.1}
                        />
                    </PanelBody>

                    <PanelBody title={__('Scroll Trigger', 'gsap-split-block')} initialOpen={false}>
                        <ToggleControl
                            label={__('Usa Scroll Trigger', 'gsap-split-block')}
                            checked={useScrollTrigger}
                            onChange={(value) => setAttributes({ useScrollTrigger: value })}
                        />

                        {useScrollTrigger && (
                            <SelectControl
                                label={__('Start Trigger', 'gsap-split-block')}
                                value={triggerStart}
                                options={[
                                    { label: __('Top 80%', 'gsap-split-block'), value: 'top 80%' },
                                    { label: __('Top 70%', 'gsap-split-block'), value: 'top 70%' },
                                    { label: __('Top center', 'gsap-split-block'), value: 'top center' },
                                    { label: __('Center center', 'gsap-split-block'), value: 'center center' }
                                ]}
                                onChange={(value) => setAttributes({ triggerStart: value })}
                            />
                        )}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="gsap-split-preview-label">
                        Contenuto Animato GSAP ({animationType})
                    </div>
                    <InnerBlocks
                        allowedBlocks={['core/heading', 'core/paragraph', 'core/list']}
                        template={[
                            ['core/heading', { level: 2, placeholder: __('Aggiungi un titolo...', 'gsap-split-block') }],
                            ['core/paragraph', { placeholder: __('Aggiungi del testo...', 'gsap-split-block') }]
                        ]}
                    />
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const blockProps = useBlockProps.save({
            className: 'gsap-split-animated-wrapper',
            'data-split-type': attributes.splitType,
            'data-animation-type': attributes.animationType,
            'data-duration': attributes.duration,
            'data-stagger': attributes.stagger,
            'data-delay': attributes.delay,
            'data-use-scroll': attributes.useScrollTrigger,
            'data-trigger-start': attributes.triggerStart
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
