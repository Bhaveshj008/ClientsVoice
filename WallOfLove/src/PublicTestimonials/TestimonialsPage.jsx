import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import api from '../../../vite-frontend/src/components/api';
import ScrollContainer from './ScrollContainer';
import { getContainerStyles, getScrollContainerStyles, getCardStyles } from './styles';
import GlobalStyles from './GlobalStyles';
import { LoadingState, BrandFooter } from './LoadingAndFooter';

const TestimonialsPage = () => {
  const { spaceId } = useParams();
  const location = useLocation();
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [customizations, setCustomizations] = useState({
    bgColor: 'rgba(31, 41, 55, 0.5)',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 0,
    scrollType: 'vertical',
    cardBgColor: '#2d3748',
    cardTextColor: '#edf2f7',
    cardPadding: 16,
    cardMargin: 16,
    cardBorderRadius: 12,
  });
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const loadingRef = useRef(null);

  useEffect(() => {
    if (window.self !== window.top) {
      document.body.style.margin = '0';
      document.body.style.height = '100vh';
      document.documentElement.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    }
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const customizationOptions = {
      bgColor: query.get('bgColor') || 'rgba(31, 41, 55, 0.5)',
      borderStyle: query.get('borderStyle') || 'none',
      borderColor: query.get('borderColor') || '#000',
      borderWidth: parseInt(query.get('borderWidth') || '1', 10),
      borderRadius: parseInt(query.get('borderRadius') || '0', 10),
      scrollType: query.get('scrollType') || 'vertical',
      cardBgColor: query.get('cardBgColor') || '#2d3748',
      cardTextColor: query.get('cardTextColor') || '#edf2f7',
      cardPadding: parseInt(query.get('cardPadding') || '16', 10),
      cardMargin: parseInt(query.get('cardMargin') || '16', 10),
      cardBorderRadius: parseInt(query.get('cardBorderRadius') || '12', 10),
      shouldAutoScroll: query.get('shouldAutoScroll') !== 'false',
    };

    setCustomizations(customizationOptions);
    setTestimonials([]);
    setOffset(0);
    setHasMore(true);
    fetchTestimonials(0);
  }, [spaceId, location.search]);

  const fetchTestimonials = async (newOffset) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await api.get(`${spaceId}/embeddebleWidget`, {
        params: { limit, offset: newOffset },
      });

      const { data, total } = response.data;

      setTestimonials((prev) => [
        ...prev,
        ...data.filter((testimonial) => !prev.some((t) => t._id === testimonial._id)),
      ]);
      setOffset(newOffset + data.length);
      setHasMore(newOffset + data.length < total);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer setup for infinite scroll
  const lastTestimonialRef = useCallback((node) => {
    if (isLoading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchTestimonials(offset);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore, offset]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || 
        isPaused || 
        testimonials.length === 0 || 
        !customizations.shouldAutoScroll) return;

    const isVertical = customizations.scrollType === 'vertical';
    const isGrid = customizations.scrollType === 'grid';
    let animationFrameId;
    let lastTime = 0;
    const scrollSpeed = 50;

    const scroll = (currentTime) => {
      if (lastTime === 0) {
        lastTime = currentTime;
      }

      const deltaTime = currentTime - lastTime;
      const scrollDistance = (scrollSpeed * deltaTime) / 1000;

      if (isGrid) {
        const maxScroll = container.scrollHeight - container.clientHeight;
        setScrollPosition(prev => {
          let newPosition = prev + scrollDistance;
          
          if (newPosition >= maxScroll - 100 && hasMore) {
            fetchTestimonials(offset);
          }
          
          if (newPosition >= maxScroll && !hasMore) {
            newPosition = 0;
            container.scrollTo({
              top: 0,
              behavior: 'auto'
            });
          } else {
            container.scrollTo({
              top: newPosition,
              behavior: 'auto'
            });
          }
          
          return newPosition;
        });
      } else {
        const maxScroll = isVertical 
          ? container.scrollHeight - container.clientHeight 
          : container.scrollWidth - container.clientWidth;

        setScrollPosition(prev => {
          let newPosition = prev + scrollDistance;

          if (newPosition >= maxScroll - 100 && hasMore) {
            fetchTestimonials(offset);
          }

          if (newPosition >= maxScroll && !hasMore) {
            newPosition = 0;
            container.scrollTo({
              top: isVertical ? 0 : container.scrollTop,
              left: isVertical ? container.scrollLeft : 0,
              behavior: 'auto'
            });
          } else {
            container.scrollTo({
              top: isVertical ? newPosition : container.scrollTop,
              left: isVertical ? container.scrollLeft : newPosition,
              behavior: 'auto'
            });
          }

          return newPosition;
        });
      }

      lastTime = currentTime;
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [customizations.scrollType, customizations.shouldAutoScroll, isPaused, testimonials.length, hasMore, offset]);

  const isIframe = window.self !== window.top;
  const containerStyles = getContainerStyles(customizations, isIframe);
  const scrollContainerStyles = getScrollContainerStyles(customizations, isIframe);
  const cardStyles = getCardStyles(customizations);

  return (
    <>
      <GlobalStyles isIframe={isIframe} />
      <div className="text-gray-200 bg-transparent font-sans" style={containerStyles}>
        <ScrollContainer
          scrollContainerRef={scrollContainerRef}
          scrollContainerStyles={scrollContainerStyles}
          setIsPaused={setIsPaused}
          testimonials={testimonials}
          cardStyles={cardStyles}
          customizations={customizations}
          lastTestimonialRef={lastTestimonialRef}
        />

        <LoadingState isLoading={isLoading} hasMore={hasMore} testimonials={testimonials} />
        <BrandFooter />
      </div>
    </>
  );
};

export default TestimonialsPage;