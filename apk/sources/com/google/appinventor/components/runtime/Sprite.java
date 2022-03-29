package com.google.appinventor.components.runtime;

import android.graphics.Canvas;
import android.os.Handler;
import android.util.Log;
import com.google.appinventor.components.annotations.DesignerProperty;
import com.google.appinventor.components.annotations.PropertyCategory;
import com.google.appinventor.components.annotations.SimpleEvent;
import com.google.appinventor.components.annotations.SimpleFunction;
import com.google.appinventor.components.annotations.SimpleObject;
import com.google.appinventor.components.annotations.SimpleProperty;
import com.google.appinventor.components.runtime.errors.AssertionFailure;
import com.google.appinventor.components.runtime.errors.IllegalArgumentError;
import com.google.appinventor.components.runtime.util.BoundingBox;
import com.google.appinventor.components.runtime.util.TimerInternal;
import java.util.HashSet;
import java.util.Set;

@SimpleObject
public abstract class Sprite extends VisibleComponent implements AlarmHandler, OnDestroyListener, Deleteable {
    private static final boolean DEFAULT_ENABLED = true;
    private static final int DEFAULT_HEADING = 0;
    private static final int DEFAULT_INTERVAL = 100;
    private static final float DEFAULT_SPEED = 0.0f;
    private static final boolean DEFAULT_VISIBLE = true;
    private static final double DEFAULT_Z = 1.0d;
    private static final String LOG_TAG = "Sprite";
    private final Handler androidUIHandler;
    protected final Canvas canvas;
    protected Form form;
    protected double heading;
    protected double headingCos;
    protected double headingRadians;
    protected double headingSin;
    protected boolean initialized;
    protected int interval;
    private final Set<Sprite> registeredCollisions;
    protected float speed;
    private final TimerInternal timerInternal;
    protected double userHeading;
    protected boolean visible;
    protected double xLeft;
    protected double yTop;
    protected double zLayer;

    /* access modifiers changed from: protected */
    public abstract void onDraw(Canvas canvas2);

    protected Sprite(ComponentContainer container, Handler handler) {
        this.initialized = false;
        this.visible = true;
        this.androidUIHandler = handler;
        if (!(container instanceof Canvas)) {
            throw new IllegalArgumentError("Sprite constructor called with container " + container);
        }
        this.canvas = (Canvas) container;
        this.canvas.addSprite(this);
        this.registeredCollisions = new HashSet();
        this.timerInternal = new TimerInternal(this, true, 100, handler);
        this.form = container.$form();
        Heading(0.0d);
        Enabled(true);
        Interval(100);
        Speed(DEFAULT_SPEED);
        Visible(true);
        mo1516Z(DEFAULT_Z);
        container.$form().registerForOnDestroy(this);
    }

    protected Sprite(ComponentContainer container) {
        this(container, new Handler());
    }

    public void Initialize() {
        this.initialized = true;
        this.canvas.registerChange(this);
    }

    @SimpleProperty(category = PropertyCategory.BEHAVIOR, description = "Controls whether the sprite moves when its speed is non-zero.")
    public boolean Enabled() {
        return this.timerInternal.Enabled();
    }

    @DesignerProperty(defaultValue = "True", editorType = "boolean")
    @SimpleProperty
    public void Enabled(boolean enabled) {
        this.timerInternal.Enabled(enabled);
    }

    @DesignerProperty(defaultValue = "0", editorType = "float")
    @SimpleProperty(category = PropertyCategory.BEHAVIOR)
    public void Heading(double userHeading2) {
        this.userHeading = userHeading2;
        this.heading = -userHeading2;
        this.headingRadians = Math.toRadians(this.heading);
        this.headingCos = Math.cos(this.headingRadians);
        this.headingSin = Math.sin(this.headingRadians);
        registerChange();
    }

    @SimpleProperty(description = "Returns the sprite's heading in degrees above the positive x-axis.  Zero degrees is toward the right of the screen; 90 degrees is toward the top of the screen.")
    public double Heading() {
        return this.userHeading;
    }

    @SimpleProperty(category = PropertyCategory.BEHAVIOR, description = "The interval in milliseconds at which the sprite's position is updated.  For example, if the interval is 50 and the speed is 10, then the sprite will move 10 pixels every 50 milliseconds.")
    public int Interval() {
        return this.timerInternal.Interval();
    }

    @DesignerProperty(defaultValue = "100", editorType = "non_negative_integer")
    @SimpleProperty
    public void Interval(int interval2) {
        this.timerInternal.Interval(interval2);
    }

    @DesignerProperty(defaultValue = "0.0", editorType = "float")
    @SimpleProperty(category = PropertyCategory.BEHAVIOR)
    public void Speed(float speed2) {
        this.speed = speed2;
    }

    @SimpleProperty(description = "he speed at which the sprite moves.  The sprite moves this many pixels every interval.")
    public float Speed() {
        return this.speed;
    }

    @SimpleProperty(category = PropertyCategory.APPEARANCE, description = "True if the sprite is visible.")
    public boolean Visible() {
        return this.visible;
    }

    @DesignerProperty(defaultValue = "True", editorType = "boolean")
    @SimpleProperty
    public void Visible(boolean visible2) {
        this.visible = visible2;
        registerChange();
    }

    @SimpleProperty(description = "The horizontal coordinate of the left edge of the sprite, increasing as the sprite moves to the right.")
    /* renamed from: X */
    public double mo1511X() {
        return this.xLeft;
    }

    @DesignerProperty(defaultValue = "0.0", editorType = "float")
    @SimpleProperty(category = PropertyCategory.APPEARANCE)
    /* renamed from: X */
    public void mo1512X(double x) {
        this.xLeft = x;
        registerChange();
    }

    @DesignerProperty(defaultValue = "0.0", editorType = "float")
    @SimpleProperty(category = PropertyCategory.APPEARANCE)
    /* renamed from: Y */
    public void mo1514Y(double y) {
        this.yTop = y;
        registerChange();
    }

    @SimpleProperty(description = "The vertical coordinate of the top of the sprite, increasing as the sprite moves down.")
    /* renamed from: Y */
    public double mo1513Y() {
        return this.yTop;
    }

    @DesignerProperty(defaultValue = "1.0", editorType = "float")
    @SimpleProperty(category = PropertyCategory.APPEARANCE)
    /* renamed from: Z */
    public void mo1516Z(double layer) {
        this.zLayer = layer;
        this.canvas.changeSpriteLayer(this);
    }

    @SimpleProperty(description = "How the sprite should be layered relative to other sprits, with higher-numbered layers in front of lower-numbered layers.")
    /* renamed from: Z */
    public double mo1515Z() {
        return this.zLayer;
    }

    /* access modifiers changed from: protected */
    public void postEvent(final Sprite sprite, final String eventName, final Object... args) {
        this.androidUIHandler.post(new Runnable() {
            public void run() {
                EventDispatcher.dispatchEvent(sprite, eventName, args);
            }
        });
    }

    @SimpleEvent
    public void CollidedWith(Sprite other) {
        if (this.registeredCollisions.contains(other)) {
            Log.e(LOG_TAG, "Collision between sprites " + this + " and " + other + " re-registered");
            return;
        }
        this.registeredCollisions.add(other);
        postEvent(this, "CollidedWith", other);
    }

    @SimpleEvent
    public void Dragged(float startX, float startY, float prevX, float prevY, float currentX, float currentY) {
        postEvent(this, "Dragged", Float.valueOf(startX), Float.valueOf(startY), Float.valueOf(prevX), Float.valueOf(prevY), Float.valueOf(currentX), Float.valueOf(currentY));
    }

    @SimpleEvent(description = "Event handler called when the sprite reaches an edge of the screen. If Bounce is then called with that edge, the sprite will appear to bounce off of the edge it reached.  Edge here is represented as an integer that indicates one of eight directions north(1), northeast(2), east(3), southeast(4), south (-1), southwest(-2), west(-3), and northwest(-4).")
    public void EdgeReached(int edge) {
        if (edge == 0 || edge < -4 || edge > 4) {
            throw new IllegalArgumentException("Illegal argument " + edge + " to Sprite.EdgeReached()");
        }
        postEvent(this, "EdgeReached", Integer.valueOf(edge));
    }

    @SimpleEvent(description = "Event indicating that a pair of sprites are no longer colliding.")
    public void NoLongerCollidingWith(Sprite other) {
        if (!this.registeredCollisions.contains(other)) {
            Log.e(LOG_TAG, "Collision between sprites " + this + " and " + other + " removed but not present");
        }
        this.registeredCollisions.remove(other);
        postEvent(this, "NoLongerCollidingWith", other);
    }

    @SimpleEvent
    public void Touched(float x, float y) {
        postEvent(this, "Touched", Float.valueOf(x), Float.valueOf(y));
    }

    @SimpleEvent
    public void Flung(float x, float y, float speed2, float heading2, float xvel, float yvel) {
        postEvent(this, "Flung", Float.valueOf(x), Float.valueOf(y), Float.valueOf(speed2), Float.valueOf(heading2), Float.valueOf(xvel), Float.valueOf(yvel));
    }

    @SimpleEvent
    public void TouchUp(float x, float y) {
        postEvent(this, "TouchUp", Float.valueOf(x), Float.valueOf(y));
    }

    @SimpleEvent
    public void TouchDown(float x, float y) {
        postEvent(this, "TouchDown", Float.valueOf(x), Float.valueOf(y));
    }

    @SimpleFunction(description = "Makes this sprite bounce, as if off a wall.  For normal bouncing, the edge argument should be the one returned by EdgeReached.")
    public void Bounce(int edge) {
        MoveIntoBounds();
        double normalizedAngle = this.userHeading % 360.0d;
        if (normalizedAngle < 0.0d) {
            normalizedAngle += 360.0d;
        }
        if ((edge == 3 && (normalizedAngle < 90.0d || normalizedAngle > 270.0d)) || (edge == -3 && normalizedAngle > 90.0d && normalizedAngle < 270.0d)) {
            Heading(180.0d - normalizedAngle);
        } else if ((edge == 1 && normalizedAngle > 0.0d && normalizedAngle < 180.0d) || (edge == -1 && normalizedAngle > 180.0d)) {
            Heading(360.0d - normalizedAngle);
        } else if ((edge == 2 && normalizedAngle > 0.0d && normalizedAngle < 90.0d) || ((edge == -4 && normalizedAngle > 90.0d && normalizedAngle < 180.0d) || ((edge == -2 && normalizedAngle > 180.0d && normalizedAngle < 270.0d) || (edge == 4 && normalizedAngle > 270.0d)))) {
            Heading(180.0d + normalizedAngle);
        }
    }

    @SimpleFunction
    public boolean CollidingWith(Sprite other) {
        return this.registeredCollisions.contains(other);
    }

    @SimpleFunction
    public void MoveIntoBounds() {
        moveIntoBounds(this.canvas.Width(), this.canvas.Height());
    }

    @SimpleFunction(description = "Moves the sprite so that its left top corner is at the specfied x and y coordinates.")
    public void MoveTo(double x, double y) {
        this.xLeft = x;
        this.yTop = y;
        registerChange();
    }

    @SimpleFunction(description = "Turns the sprite to point towards a designated target sprite. The new heading will be parallel to the line joining the centerpoints of the two sprites.")
    public void PointTowards(Sprite target) {
        Heading(-Math.toDegrees(Math.atan2((target.mo1513Y() - mo1513Y()) + ((double) ((target.Height() - Height()) / 2)), (target.mo1511X() - mo1511X()) + ((double) ((target.Width() - Width()) / 2)))));
    }

    @SimpleFunction(description = "Turns the sprite to point towards the point with coordinates as (x, y).")
    public void PointInDirection(double x, double y) {
        Heading(-Math.toDegrees(Math.atan2((y - mo1513Y()) - ((double) (Height() / 2)), (x - mo1511X()) - ((double) (Width() / 2)))));
    }

    /* access modifiers changed from: protected */
    public void registerChange() {
        if (!this.initialized) {
            this.canvas.getView().invalidate();
            return;
        }
        int edge = hitEdge();
        if (edge != 0) {
            EdgeReached(edge);
        }
        this.canvas.registerChange(this);
    }

    /* access modifiers changed from: protected */
    public int hitEdge() {
        if (!this.canvas.ready()) {
            return 0;
        }
        return hitEdge(this.canvas.Width(), this.canvas.Height());
    }

    /* access modifiers changed from: protected */
    @SimpleFunction
    public final void moveIntoBounds(int canvasWidth, int canvasHeight) {
        boolean moved = false;
        if (Width() > canvasWidth) {
            if (this.xLeft != 0.0d) {
                this.xLeft = 0.0d;
                moved = true;
            }
        } else if (overWestEdge()) {
            this.xLeft = 0.0d;
            moved = true;
        } else if (overEastEdge(canvasWidth)) {
            this.xLeft = (double) (canvasWidth - Width());
            moved = true;
        }
        if (Height() > canvasHeight) {
            if (this.yTop != 0.0d) {
                this.yTop = 0.0d;
                moved = true;
            }
        } else if (overNorthEdge()) {
            this.yTop = 0.0d;
            moved = true;
        } else if (overSouthEdge(canvasHeight)) {
            this.yTop = (double) (canvasHeight - Height());
            moved = true;
        }
        if (moved) {
            registerChange();
        }
    }

    /* access modifiers changed from: protected */
    public void updateCoordinates() {
        this.xLeft += ((double) this.speed) * this.headingCos;
        this.yTop += ((double) this.speed) * this.headingSin;
    }

    private final boolean overWestEdge() {
        return this.xLeft < 0.0d;
    }

    private final boolean overEastEdge(int canvasWidth) {
        return this.xLeft + ((double) Width()) > ((double) canvasWidth);
    }

    private final boolean overNorthEdge() {
        return this.yTop < 0.0d;
    }

    private final boolean overSouthEdge(int canvasHeight) {
        return this.yTop + ((double) Height()) > ((double) canvasHeight);
    }

    /* access modifiers changed from: protected */
    public int hitEdge(int canvasWidth, int canvasHeight) {
        boolean west = overWestEdge();
        boolean north = overNorthEdge();
        boolean east = overEastEdge(canvasWidth);
        boolean south = overSouthEdge(canvasHeight);
        if (!north && !south && !east && !west) {
            return 0;
        }
        MoveIntoBounds();
        if (west) {
            if (north) {
                return -4;
            }
            if (south) {
                return -2;
            }
            return -3;
        } else if (east) {
            if (north) {
                return 2;
            }
            if (south) {
                return 4;
            }
            return 3;
        } else if (north) {
            return 1;
        } else {
            if (south) {
                return -1;
            }
            throw new AssertionFailure("Unreachable code hit in Sprite.hitEdge()");
        }
    }

    public BoundingBox getBoundingBox(int border) {
        return new BoundingBox(mo1511X() - ((double) border), mo1513Y() - ((double) border), ((mo1511X() + ((double) Width())) - DEFAULT_Z) + ((double) border), ((mo1513Y() + ((double) Height())) - DEFAULT_Z) + ((double) border));
    }

    public static boolean colliding(Sprite sprite1, Sprite sprite2) {
        BoundingBox rect1 = sprite1.getBoundingBox(1);
        if (!rect1.intersectDestructively(sprite2.getBoundingBox(1))) {
            return false;
        }
        for (double x = rect1.getLeft(); x <= rect1.getRight(); x += DEFAULT_Z) {
            for (double y = rect1.getTop(); y <= rect1.getBottom(); y += DEFAULT_Z) {
                if (sprite1.containsPoint(x, y) && sprite2.containsPoint(x, y)) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean intersectsWith(BoundingBox rect) {
        BoundingBox rect1 = getBoundingBox(0);
        if (!rect1.intersectDestructively(rect)) {
            return false;
        }
        for (double x = rect1.getLeft(); x < rect1.getRight(); x += DEFAULT_Z) {
            for (double y = rect1.getTop(); y < rect1.getBottom(); y += DEFAULT_Z) {
                if (containsPoint(x, y)) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean containsPoint(double qx, double qy) {
        return qx >= this.xLeft && qx < this.xLeft + ((double) Width()) && qy >= this.yTop && qy < this.yTop + ((double) Height());
    }

    public void alarm() {
        if (this.initialized && this.speed != DEFAULT_SPEED) {
            updateCoordinates();
            registerChange();
        }
    }

    public HandlesEventDispatching getDispatchDelegate() {
        return this.canvas.$form();
    }

    public void onDestroy() {
        this.timerInternal.Enabled(false);
    }

    public void onDelete() {
        this.timerInternal.Enabled(false);
        this.canvas.removeSprite(this);
    }
}
